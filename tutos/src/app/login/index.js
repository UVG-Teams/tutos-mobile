import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Button,
    TouchableHighlight,
    ActivityIndicator,
    Platform,
} from 'react-native'

import {
    Container,
    Header,
    Left,
    Button as Btn,
} from 'native-base'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from '../../layout/themes'
import { RenderInput } from '../../components/form/field'

import * as actions from '../../tools/actions/auth'
import * as selectors from "../../tools/reducers"


const Login = ({
    handleSubmit,
    rememberPassword,
    isLoading,
    error = null,
    isAuthenticated = false,
    navigation,
}) => {
    if (isAuthenticated) {
        navigation.navigate('Home')
    }
    return (
        <Container style={ styles.background }>
            <Header transparent>
                <Left>
                    {
                        Platform.select({
                            ios: (
                                <Btn transparent
                                    onPress={ () => navigation.navigate('Index') }
                                >
                                    <FontAwesomeIcon style={ theme.headerIcons } icon='chevron-left' size={ 25 } /> 
                                    <Text style={styles.backTxt}>Atrás</Text>
                                </Btn>
                            )
                        })
                    }
                </Left>
            </Header>
            <ImageBackground style={ styles.background }>
                <View style={ styles.content }>
                    <Text style={ styles.title }>Tuto's</Text>
                    <Field
                        name='email'
                        placeholder='Usuario'
                        component={ RenderInput }
                    />
                    <Field
                        type={'password'}
                        name='password'
                        placeholder='Contraseña'
                        component={ RenderInput }
                    />
                    {
                        error && (
                            <Text style={ theme.errorText }>{ error }</Text>
                        )
                    }
                    {
                        isLoading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <>
                                <TouchableHighlight style={ styles.buttonLogin }>
                                    <Button
                                        onPress={ handleSubmit }
                                        {...Platform.select({ios: color = 'white'}) }
                                        title="Ingresar"
                                    />
                                </TouchableHighlight>
                                <TouchableHighlight style={ styles.buttonPassword }>
                                    <Button
                                        onPress={ rememberPassword }
                                        title="¿Olvidaste tu contraseña?"
                                    />
                                </TouchableHighlight>
                            </>
                        )
                    }
                </View>
            </ImageBackground>
        </Container>
    )
}

export default connect(
    state => ({
        isLoading: selectors.getIsAuthenticating(state),
        error: selectors.getAuthenticatingError(state),
        isAuthenticated: selectors.isAuthenticated(state),
    }),
    dispatch => ({
        rememberPassword() {
            alert('Que mal')
        },
    }),
)(
    reduxForm({
        form: 'login',
        onSubmit({ email, password }, dispatch) {
            dispatch(actions.startLogin(email, password))
        },
        validate(values) {
            const errors = {}
            // if (values.email && !values.email.includes('@')) {
            //     errors.email = "Ingrese un correo valido"
            // }
            // return errors
        },
    })(Login),
)


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
        marginBottom: 30,
    },
    ...Platform.select({
        ios: {
            buttonLogin: {
                width: '100%',
                marginTop: 15,
                backgroundColor: 'black',
            },
            buttonPassword: {
                marginTop: 100,
            },
            backTxt: {
                fontSize: 20
            }
        },
        android: {
            buttonLogin: {
                width: '100%',
                marginTop: 15,
            },
            buttonPassword: {
                marginTop: 100,
            },
        }
    })
})
