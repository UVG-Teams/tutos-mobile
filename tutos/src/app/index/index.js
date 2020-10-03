import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    ImageBackground,
    StyleSheet,
    Platform,
    Button,
} from 'react-native';
import { useCavy, hook, wrap } from 'cavy'

import { TouchableOpacity } from 'react-native-gesture-handler'

import Carousel from 'react-native-looped-carousel';

import imgCarousel1 from '../../../media/1.png';
import imgCarousel2 from '../../../media/2.png';
import imgCarousel3 from '../../../media/3.png';

const { width, height } = Dimensions.get('window');

class Index extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            size: { width, height },
        };
    }
    
    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }
    
    render() {
        return (
            <View
                style={{ flex: 1 }}
                onLayout={this._onLayoutDidChange}
                ref={this.props.generateTestHook('Index')}
            >
                <Carousel
                    delay={8000}
                    style={this.state.size}
                    autoplay
                    onAnimateNextPage={(p) => console.log(p)}
                >
                    <View style={this.state.size}>
                        <ImageBackground source={imgCarousel1} style={styles.image}>
                            <Text style={styles.text}>Encuentra una tutoría a la hora que puedas, de la materia que quieras</Text>
                        </ImageBackground>
                    </View>

                    <View style={this.state.size}>
                        <ImageBackground source={imgCarousel2} style={styles.image}>
                            <Text style={styles.textUp}>Encuentra tutores cerca de ti</Text>
                        </ImageBackground>
                    </View>

                    <View style={this.state.size}>
                        <ImageBackground source={imgCarousel3} style={styles.image}>
                            <Text style={styles.textUp}>Si eres tutor, crea tu perfil y ten ingresos económicos</Text>
                        </ImageBackground>
                    </View>
                </Carousel>
                <View style={styles.options}>
                    {/* <TouchableHighlight style={ styles.buttonLogin }>
                        <Button
                            onPress={ () => this.props.navigation.navigate('login') }
                            color="black"
                            title="Iniciar sesión"
                            ref={this.props.generateTestHook('IndexScreen.ButtonLogin')}
                        />
                    </TouchableHighlight> */}
                    <TouchableOpacity  style={ styles.buttonLogin } onPress={  () => this.props.navigation.navigate('login') }>
                        <Text style={styles.txtButtonLogin}>Iniciar sesión</Text>
                    </TouchableOpacity>

                    {/* <TouchableHighlight style={ styles.buttonSignup }>
                        <Button
                            onPress={ () => this.props.navigation.navigate('signup') }
                            color="black"
                            title="Regístrate"
                            ref={this.props.generateTestHook('IndexScreen.ButtonRegister')}
                        />
                    </TouchableHighlight> */}

                    <TouchableOpacity  style={ styles.buttonSignup } onPress={  () => this.props.navigation.navigate('signup') }>
                        <Text style={styles.txtButtonSignup}>Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default hook(Index)

const styles = StyleSheet.create({

    buttonLogin: {
        // width: '90%',
        marginRight: 20,
        marginBottom: 70,
        padding: 20,
        backgroundColor: '#6BB5FF',
        borderRadius: 10,
    },

    txtButtonLogin: {
        fontSize: 20
    },

    buttonSignup: {
        // width: '100%',
        marginBottom: 70,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30, 
        backgroundColor: '#6BB5FF',
        borderRadius: 10,
    },

    txtButtonSignup: {
        fontSize: 20
    },

    options: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: width,
        bottom: 24,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

    text: {
        fontSize: 45,
        color: '#ffffff',
        textAlign: 'center',
        textShadowColor: '#000000',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },

    textUp: {
        fontSize: 45,
        color: '#ffffff',
        textAlign: 'center',
        textShadowColor: '#000000',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: '120%',
    },
})
