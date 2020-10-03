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
import { useCavy, hook, wrap } from 'cavy'

import * as actions from '../../tools/actions/auth'
import * as selectors from "../../tools/reducers"
import { TouchableOpacity } from 'react-native-gesture-handler'


const Login = ({
    handleSubmit,
    rememberPassword,
    isLoading,
    error = null,
    isAuthenticated = false,
    navigation,
}) => {
    const generateTestHook = useCavy();

    if (isAuthenticated) {
        navigation.navigate('home')
    }
    return (
        <Container
            style={ styles.background }
            ref={generateTestHook('Login')}
        >
            <Header transparent>
                <Left>
                    {
                        Platform.select({
                            ios: (
                                <Btn transparent
                                    onPress={ () => navigation.navigate('index') }
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
                        cavyName='LoginScreen.Username'
                        component={ RenderInput }
                    />
                    <Field
                        type={'password'}
                        name='password'
                        placeholder='Contraseña'
                        cavyName='LoginScreen.Password'
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
                                <TouchableOpacity
                                    style={ styles.buttonLogin }
                                    onPress={ handleSubmit }
                                    ref={generateTestHook('LoginScreen.Button')}
                                >
                                    <Text style={styles.txtButtonLogin}>Ingresar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={ styles.buttonPassword }
                                    onPress={ rememberPassword }
                                    ref={generateTestHook('LoginScreen.ButtonForgot')}
                                >
                                    <Text style={styles.txtButtonPassword}>¿Olvidaste tu contraseña?</Text>
                                </TouchableOpacity>
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
    buttonLogin: {
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: 'black',
        color: 'white',
        paddingLeft: '39%',
        paddingRight: '39%',
        paddingTop: 7,
        paddingBottom: 7,
    },
    txtButtonLogin: {
        // width: '100%',
        color: 'white',
        fontSize: 19,
    },
    buttonPassword: {
        width: '100%',
        marginTop: 100,
        borderRadius: 5,
        backgroundColor: '#146dc7',
        color: 'white',
        paddingLeft: '22%',
        paddingRight: '22%',
        paddingTop: 7,
        paddingBottom: 7,
    },
    txtButtonPassword: {
        width: '100%',
        color: 'white',
        fontSize: 15,
    },
    ...Platform.select({
        ios: {
            
            // buttonPassword: {
            //     marginTop: 100,
            // },
            backTxt: {
                fontSize: 20
            }
        },
        android: {
            // buttonLogin: {
            //     width: '100%',
            //     marginTop: 15,
            // },
            // buttonPassword: {
            //     marginTop: 100,
            // },
        }
    })
})
