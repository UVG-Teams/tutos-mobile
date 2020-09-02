import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    ImageBackground,
    StyleSheet,
    Button,
} from 'react-native';
import Carousel from 'react-native-looped-carousel';

import imgCarousel1 from '../../../media/1.png';
import imgCarousel2 from '../../../media/2.png';
import imgCarousel3 from '../../../media/3.png';

const { width, height } = Dimensions.get('window');

export default class Index extends Component {
    
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
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
                <Carousel
                    delay={2000}
                    style={this.state.size}
                    autoplay
                    onAnimateNextPage={(p) => console.log(p)}
                >
                    <View style={this.state.size}>
                        <ImageBackground source={imgCarousel1} style={styles.image}></ImageBackground>
                    </View>

                    <View style={this.state.size}>
                        <ImageBackground source={imgCarousel2} style={styles.image}></ImageBackground>
                    </View>

                    <View style={this.state.size}>
                        <ImageBackground source={imgCarousel3} style={styles.image}></ImageBackground>
                    </View>
                </Carousel>
                <View style={styles.options}>
                    <TouchableHighlight style={ styles.buttonLogin }>
                        <Button
                            // onPress={ handleSubmit }
                            color="black"
                            title="Login"
                        />
                    </TouchableHighlight>

                    <TouchableHighlight style={ styles.buttonSignup }>
                        <Button
                            // onPress={ handleSubmit }
                            color="black"
                            title="Sign Up"
                        />
                    </TouchableHighlight>
                </View>
            </View>
            );
        }
    }

const styles = StyleSheet.create({
    buttonLogin: {
        width: '40%',
        marginRight: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },

    buttonSignup: {
        width: '40%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
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
        justifyContent: "center"
      },
})