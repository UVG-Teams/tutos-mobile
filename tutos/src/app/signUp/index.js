import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Right,
    Card,
    CardItem,
    Form,
    Item,
    Input,
    DatePicker,
    Picker,
} from 'native-base'

import { useCavy } from 'cavy'
import { RenderInput, RenderInputNumeric } from '../../components/form/field'

import { reduxForm, Field } from 'redux-form'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { darkBlue1, theme } from './../../layout/themes'

import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/signUp'


const renderPickerGenre = ({input:{onChange, value, placeholder, ...restInput}}) => (
    <Picker
        style={{marginBottom:10, width:'100%', backgroundColor:'white'}}
        mode='dropdown'
        selectedValue={value}
        onValueChange={onChange}
        itemTextStyle={{color:'black'}} 
        placeholder='M'       
    >
        <Picker.Item label='M' value='M'/>
        <Picker.Item label='F' value='F'/>
    </Picker>
)

const renderPickerTutor = ({input:{onChange, value, placeholder, ...restInput}}) => (
    <Picker
        style={{marginBottom:10, width:'100%', backgroundColor:'white'}}
        mode='dropdown'
        selectedValue={value}
        onValueChange={onChange}
        placeholder='Tutorado'
    >
        <Picker.Item label='Tutor' value={true}/>
        <Picker.Item label='Tutorado' value={false}/>
    </Picker>
)

const renderDatePicker = ({input:{onChange, value, placeholder,...restInput}}) => (
    <DatePicker
        defaultDate={new Date(2019, 1, 1)}
        minimumDate={new Date(1920, 1, 1)}
        maximumDate={new Date(2020, 1, 1)}
        locale={'en'}
        modalTransparent={false}
        animationType={'slide'}
        androidMode={'default'}
        placeHolderText='Seleccionar fecha de nacimiento'
        placeHolderTextStyle={{color:'lightgray', borderRadius: 5, backgroundColor: 'white'}}
        textStyle={{color:'black', borderRadius: 5, backgroundColor: 'white'}}
        disabled={false}
        onDateChange={onChange}
        value={value}
        // formatChosenDate={value => {return moment(value).format('YYYY-MM-DD');}}
    />
)

const SignUp = ({ navigation, handleSubmit, isSigningUp }) => {
    const generateTestHook = useCavy();

    return (
        <ImageBackground
            style={theme.background}
            ref={generateTestHook('SignUp')}
        >
            <Container style={{ backgroundColor: 'transparent' }}>
                <Header style={theme.header}>
                    <Left>
                        <Button transparent
                            onPress={() => navigation.openDrawer()}
                        >
                            <FontAwesomeIcon style={theme.headerIcon} icon='bars' size={25} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 25}}>
                            Registro
                        </Text>
                    </Body>
                    <Right></Right>
                </Header>
                <Content style={theme.content}>
                    <View style={styles.content}>
                        <Text style={styles.fieldText}>Tipo de cuenta:</Text>
                        <Field
                            name='isTutor'
                            component={renderPickerTutor}
                        />
                        <Text style={styles.fieldText}>Género:</Text>
                        <Field
                            name='gender'
                            component={renderPickerGenre}
                        />
                        <Text style={styles.fieldText}>Usuario:</Text>
                        <Field
                            name='username'
                            placeholder='Joe'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.Username')}
                        />
                        <Text style={styles.fieldText}>Nombre:</Text>
                        <Field
                            name='firstName'
                            placeholder='Jose'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.FirstName')}
                        />
                        <Text style={styles.fieldText}>Apellido:</Text>
                        <Field
                            name='lastName'
                            placeholder='Block'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.LastName')}
                        />
                        <Text style={styles.fieldText}>Correo electrónico:</Text>
                        <Field
                            name='email'
                            placeholder='soyjoe@uvg.edu.gt'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.Email')}
                        />
                        <Text style={styles.fieldText}>Contraseña:</Text>
                        <Field
                            type={'password'}
                            name='password'
                            placeholder='Contraseña'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.Password')}
                        />
                        <Text style={styles.fieldText}>Confirmar contraseña:</Text>
                        <Field
                            type={'password'}
                            name='confirmPassword'
                            placeholder='Confirmar Contraseña'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.PasswordConfirm')}
                        />
                        <Text style={styles.fieldText}>Núméro de teléfono:</Text>
                        <Field
                            name='phone'
                            placeholder='58340987'
                            component={RenderInputNumeric}
                        />
                        <Text style={styles.fieldText}>Fecha de nacimiento:</Text>
                        <Field
                            name='birth'
                            component={renderDatePicker}
                        />
                        <View>
                            {
                                isSigningUp ? (
                                    <Text style={styles.buttonSignUp}>{'Creando perfil...'}</Text>
                                ) : (
                                        <TouchableOpacity
                                            style={styles.buttonSignUp}
                                            onPress={handleSubmit}
                                            ref={generateTestHook('SignupScreen.Button')}
                                        >
                                            <Text style={styles.txtBtnSignUp}>Crear cuenta</Text>
                                        </TouchableOpacity>
                                    )
                            }
                        </View>
                    </View>
                </Content>
            </Container>
        </ImageBackground>
    )
}


export default connect(
    state => ({
        isSigningUp: selectors.getIsSigningUp(state),
    }),
)(
    reduxForm({
        form: 'signUp',
        onSubmit({ username, password, confirmPassword, firstName, lastName, email, birth, phone, gender, isTutor }, dispatch) {
            const year = birth.getFullYear();
            const month = birth.getMonth()+1;
            const day = birth.getDate();
            const birthdate = year+'-'+month+'-'+day;
            dispatch(
                actions.startSignUp(username, password, firstName, lastName, email, birthdate, gender, isTutor, phone, 100),
            );
        },
        validate(values) {
            const errors = {};
            if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
                errors.confirmPassword = "Las contraseñas no son iguales!"
            } else if (values.email && !values.email.includes('@')) {
                errors.email = "Ingrese un correo con @"
            }
            return errors;
        },
    })(SignUp)
);

const styles = StyleSheet.create({
    background: {
        ...theme.background,
        justifyContent: 'center',
    },
    content: {
        ...theme.content,
        width: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    fieldText: {
        marginBottom: 5,
        marginTop: 5,
        fontSize: 17
    },
    buttonSignUp: {
        width: '100%',
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#146dc7',
        paddingLeft: '34%',
        paddingRight: '39%',
        paddingTop: 7,
        paddingBottom: 7,
    },
    txtBtnSignUp: {
        color: 'white',
        fontSize: 19,
        width: '160%',
    },
    tutorSelect: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    tutorButtonSelected: {
        backgroundColor: darkBlue1,
        borderRadius: 50,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        marginBottom: 10,
    },
    tutorButtonUnselected: {
        borderRadius: 50,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        marginBottom: 10,
    },
})
