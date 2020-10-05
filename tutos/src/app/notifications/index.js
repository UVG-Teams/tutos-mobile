import React, {component, useEffect, useState} from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ImageBackground,
    StyleSheet,
    Dimensions,
} from 'react-native'

import {
    Container,
    Content,
    Button,
    Header,
    Left,
    Body,
    Right,
    Title,
    Card,
    CardItem,
    Row,
    Col,
    Center,
} from 'native-base'

import Modal from 'react-native-modal';

import { TouchableOpacity } from 'react-native-gesture-handler'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'
import { wrap } from 'lodash';


const Notifications = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return(
        <ImageBackground
        style={ theme.background }
        >
            <Container style={{ backgroundColor: 'transparent'}}>
                <Content style={ theme.content }>
                    <View>
                        <Modal 
                        isVisible={true}
                        onBackdropPress={() => setModalVisible(false) && navigation.navigate('home') }>
                            <View>
                                <Card>
                                    <CardItem header bordered style = {{display: "flex", flex: 1, alignItems: "center"}}>
                                        <View style={ styles.cardInfo }>
                                            <Row>
                                                <Col>
                                                    <Text style = {{fontSize: 15, marginTop: 2}}>Recordatorio tutoría: </Text>
                                                </Col>
                                                <Right>
                                                    <Col>
                                                        <FontAwesomeIcon style={{color: "gray"}} icon='trash' size={ 15 }/>
                                                    </Col>  
                                                </Right>
                                            </Row>
                                        </View>
                                    </CardItem>
                                    <CardItem header bordered>
                                            <View style={ styles.cardInfo }>
                                                <Text style = {{fontSize: 15, color: "gray"}}>Tutoría hoy a las 6:30 PM con Marco Fuentes.</Text>
                                            </View>
                                    </CardItem>
                                </Card>

                            </View>
                        </Modal>
                    </View>
                </Content>
            </Container>
        </ImageBackground>
    )
}
    


export default Notifications


const styles = StyleSheet.create({
    cardInfo: {
        width: "100%",
    }
})