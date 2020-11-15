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
        style={{borderWidth:1, borderStyle:"solid", width:50, marginBottom:10}}
        note
        mode='dropdown'
        selectedValue={value}
        onValueChange={onChange}
        itemTextStyle={{color:'black'}}        
    >
        <Picker.Item label='M' value='M'/>
        <Picker.Item label='F' value='F'/>
    </Picker>
)

const renderPickerTutor = ({input:{onChange, value, placeholder, ...restInput}}) => (
    <Picker
        style={{borderWidth:1, borderStyle:"solid", width:107, marginBottom:10}}
        note
        mode='dropdown'
        selectedValue={value}
        onValueChange={onChange}
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
        animationType={'fade'}
        androidMode={'default'}
        placeHolderText='Elija fecha de nacimiento'
        textStyle={{color:'black'}}
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
                    <Body></Body>
                    <Right></Right>
                </Header>
                <Content style={theme.content}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Registro</Text>
                        <View style={styles.tutorSelect}>
                            <Text style={styles.tutorText}>Elija el tipo de cuenta:</Text>
                            <Field
                            name='isTutor'
                            component={renderPickerTutor}
                            />
                        </View>
                        <View style={styles.genderSelect}>
                            <Text style={styles.genderText}>Elija su género:</Text>
                            <Field
                            name='gender'
                            component={renderPickerGenre}
                            />
                        </View>
                        <Field
                            name='username'
                            placeholder='Usuario'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.Username')}
                        />
                        <Field
                            name='firstName'
                            placeholder='Nombre'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.FirstName')}
                        />
                        <Field
                            name='lastName'
                            placeholder='Apellido'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.LastName')}
                        />
                        <Field
                            name='email'
                            placeholder='Email'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.Email')}
                        />
                        <Field
                            type={'password'}
                            name='password'
                            placeholder='Contraseña'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.Password')}
                        />
                        <Field
                            type={'password'}
                            name='confirmPassword'
                            placeholder='Confirmar Contraseña'
                            component={RenderInput}
                            ref={generateTestHook('SignupScreen.PasswordConfirm')}
                        />
                        <Field
                            name='phone'
                            placeholder='Teléfono'
                            component={RenderInputNumeric}
                        />
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
                                            <Text>Crear cuenta</Text>
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
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        fontSize: 35,
        marginBottom: 10,
    },
    buttonSignUp: {
        width: '100%',
        marginTop: 20,
    },
    tutorSelect: {
        display: "flex",
        flexDirection: "row",
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
    genderSelect: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
    },
    genderText: {
        marginRight: 70,
        marginLeft:-90,
    },
    tutorSelect: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
    },
    tutorText: {
        marginRight: 20,
        marginLeft:-35,
    },
})
