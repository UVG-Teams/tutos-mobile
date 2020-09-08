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

import { RenderInput } from '../../components/form/field'

import { reduxForm, Field } from 'redux-form'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'

import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/signUp'


const SignUp = ({ navigation, handleSubmit, isSigningUp, }) => {
    const date = new Date();
    const setDate = (newDate) => {
        date = newDate
    };
    return(
    <ImageBackground
        style={ theme.background }
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
                    />
                    <Field
                        name='firstName'
                        placeholder='Nombre'
                        component={ RenderInput }
                    />
                    <Field
                        name='lastName'
                        placeholder='Apellido'
                        component={ RenderInput }
                    />
                    <Field
                        name='email'
                        placeholder='Email'
                        component={ RenderInput }
                    />
                    <Field
                        type={'password'}
                        name='password'
                        placeholder='Contraseña'
                        component={ RenderInput }
                    />
                    <Field
                        type={'password'}
                        name='confirmPassword'
                        placeholder='Confirmar Contraseña'
                        component={ RenderInput }
                    />
                    <DatePicker
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
                    />
                    <View>
                        {
                            isSigningUp ? (
                                <Text style={styles.buttonSignUp}>{'Creando perfil...'}</Text>
                            ):(
                                <TouchableOpacity style={ styles.buttonSignUp } onPress={handleSubmit}>
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
        onSubmit({username, password, confirmPassword, firstName, lastName, email}, dispatch){
            dispatch(
                actions.startSignUp(username, password, firstName, lastName, email, "1999-9-9","M",true,342343454,100),
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
        marginTop:20,
        fontSize: 40,
        marginBottom: 50,
    },
    buttonSignUp: {
        width: '100%',
        marginTop: 50,
    },
})
