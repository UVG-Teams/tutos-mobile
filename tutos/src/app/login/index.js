import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import {
    StyleSheet,
    ScrollView,
    View,
    ImageBackground,
    Dimensions,
    Text,
    TextInput,
    Button,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native'

import { RenderInput } from '../../components/form/field'

// import * as actions from '../tools/actions/auth'
// import * as selectors from "../tools/reducers"


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
        <ImageBackground style={ styles.image }>
            <View style={ styles.view }>
                <Text style={ styles.title }>
                    Bienvenido 
                </Text>
                <Field
                    name='email'
                    placeholder='email'
                    component={ RenderInput }
                    // normalize={ value => value && (value.charAt().toLowerCase() + value.slice(1)) }
                />
                <Field
                    type={'password'}
                    name='password'
                    placeholder='password'
                    component={ RenderInput }
                    // normalize={ value => value && (value.charAt().toLowerCase() + value.slice(1)) }
                />
                {
                    error && (
                        <Text style={ styles.title }>
                            { error }
                        </Text>
                    )
                }
                {
                    isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <>
                            <TouchableHighlight style={ styles.buttonLogin }>
                                <Button
                                    onPress={ () => navigation.navigate('Home') }
                                    color="black"
                                    title="Login"
                                    accessibilityLabel="Learn more about this button"
                                />
                            </TouchableHighlight>
                            <TouchableHighlight style={ styles.buttonPassword }>
                                <Button
                                    onPress={ rememberPassword }
                                    color="#3689e6"
                                    title="Forgot your password?"
                                    accessibilityLabel="Learn more about this button"
                                />
                            </TouchableHighlight>
                        </>
                    )
                }
            </View>
        </ImageBackground>
    )
}

export default connect(
    state => ({
        // isLoading: selectors.getIsAuthenticating(state),
        // error: selectors.getAuthenticatingError(state),
        // isAuthenticated: selectors.isAuthenticated(state),
        isLoading: false,
        error: false,
        isAuthenticated: false,
    }),
    dispatch => ({
        rememberPassword() {
            alert('Que mal')
        },
    }),
)(
    reduxForm({
        form: 'login',
        onSubmit({email, password}, dispatch) {
            dispatch(actions.startLogin(email, password))
        },
        // validate(values) {
        //     const errors = {}
        //     if (values.email && !values.email.includes('@')) {
        //         errors.email = "Ingrese un correo con @"
        //     }
        //     return errors
        // },
    })(Login),
)


// · 
const styles = StyleSheet.create({
    view: {
        flex: 1, 
        width: 320,
        alignItems: 'center', 
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
    },
    title: {
        fontSize: 34,
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40, 
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'rgb(255,255,255)',
        backgroundColor: 'rgb(255,255,255)',
        // padding: 20,
        paddingStart: 15,
        marginBottom: 10,
        shadowColor: 'rgb(200,200,200)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: '#edf6ff',
        width: Dimensions.get('window').width,
    },
    buttonLogin: {
        height: 40,
        width: '100%',
        borderRadius: 4,
        backgroundColor: "#3689e6",
        marginTop: 5,
    },
    buttonPassword: {
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "#3689e6",
        borderBottomColor: "#3689e6",
        marginTop: 100,
        padding: 2,
    },
})
