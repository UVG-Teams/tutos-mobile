import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    StyleSheet,
    Button,
    YellowBox,
} from 'react-native';
import Carousel from 'react-native-looped-carousel';

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
                    // pageInfo
                    onAnimateNextPage={(p) => console.log(p)}
                >
                    <View style={[{ backgroundColor: '#BADA55' }, this.state.size]}>
                        <Text>HOLAAAAAA</Text>
                        
                    </View>
                    <View style={[{ backgroundColor: 'red' }, this.state.size]}><Text>2</Text></View>
                    <View style={[{ backgroundColor: 'blue' }, this.state.size]}><Text>3</Text></View>
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
        // marginTop: 15,
        marginRight: 20,
        backgroundColor: '#ffffff',
    },

    buttonSignup: {
        width: '40%',
        // marginTop: 15,
        backgroundColor: '#ffffff',
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
})