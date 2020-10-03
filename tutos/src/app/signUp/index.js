import React from 'react'
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
} from 'native-base'

import { useCavy } from 'cavy'
import { RenderInput } from '../../components/form/field'

import { reduxForm, Field } from 'redux-form'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'

import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/signUp'


const SignUp = ({ navigation, handleSubmit, isSigningUp }) => {
    const generateTestHook = useCavy();
    // const date = new Date();
    // const setDate = (newDate) => {
    //     date = newDate
    //     console.log(date)
    // };
    
    return (
    <ImageBackground
        style={ theme.background }
        ref={generateTestHook('SignUp')}
    >
        <Container style={{ backgroundColor: 'transparent'}}>
            <Header style={ theme.header }>
                <Left>
                    <Button transparent
                        onPress={ () => navigation.openDrawer() }
                    >
                        <FontAwesomeIcon style={ theme.headerIcon } icon='bars' size={ 25 } />
                    </Button>
                </Left>
                <Body></Body>
                <Right></Right>
            </Header>
            <Content style={ theme.content }>
                <View style={styles.content}>
                    <Text style={styles.title}>Registro</Text>
                    <Field
                        name='username'
                        placeholder='Usuario'
                        component={ RenderInput }
                        ref={generateTestHook('SignupScreen.Username')}
                    />
                    <Field
                        name='firstName'
                        placeholder='Nombre'
                        component={ RenderInput }
                        ref={generateTestHook('SignupScreen.FirstName')}
                    />
                    <Field
                        name='lastName'
                        placeholder='Apellido'
                        component={ RenderInput }
                        ref={generateTestHook('SignupScreen.LastName')}
                    />
                    <Field
                        name='email'
                        placeholder='Email'
                        component={ RenderInput }
                        ref={generateTestHook('SignupScreen.Email')}
                    />
                    <Field
                        type={'password'}
                        name='password'
                        placeholder='Contraseña'
                        component={ RenderInput }
                        ref={generateTestHook('SignupScreen.Password')}
                    />
                    <Field
                        type={'password'}
                        name='confirmPassword'
                        placeholder='Confirmar Contraseña'
                        component={ RenderInput }
                        ref={generateTestHook('SignupScreen.PasswordConfirm')}
                    />
                    <Field
                        name='birthdate'
                        placeholder='Fecha de nacimiento YYYY-MM-DD'
                        component={ RenderInput }
                    />
                    <Field
                        name='phone'
                        placeholder='Teléfono'
                        component={ RenderInput }
                    />
                    <Field
                        name='gender'
                        placeholder='Género M/F'
                        component={ RenderInput }
                    />
                    {/* <DatePicker
                        default={new Date(2019, 1, 1)}
                        minimumDate={new Date(1920, 1, 1)}
                        maximumDate={new Date(2020,1,1)}
                        locale={'en'}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Fecha de nacimiento"
                        textStyle={{color:"black"}}
                        disabled={false}
                        onDataChange={setDate}
                    /> */}

                    <View>
                        {
                            isSigningUp ? (
                                <Text style={styles.buttonSignUp}>{'Creando perfil...'}</Text>
                            ):(
                                <TouchableOpacity
                                    style={ styles.buttonSignUp }
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
)}


export default connect(
    state=> ({
        isSigningUp: selectors.getIsSigningUp(state),
    }),
)(
    reduxForm({
        form: 'signUp',
        onSubmit({username, password, confirmPassword, firstName, lastName, email, birthdate, phone, gender}, dispatch){
            phone = parseInt(phone)
            dispatch(
                actions.startSignUp(username, password, firstName, lastName, email, birthdate,gender,true,phone,100),
            );
        },
        validate(values) {
            const errors = {};
            if(values.password && values.confirmPassword && values.password !== values.confirmPassword) {
                errors.confirmPassword = "Las contraseñas no son iguales!"
            }else if (values.email && !values.email.includes('@')) {
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
        fontSize: 40,
        marginBottom: 20,
    },
    buttonSignUp: {
        width: '100%',
        marginTop: 30,
    },
})
