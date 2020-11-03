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
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'
import { wrap } from 'lodash';

import * as actions from '../../tools/actions/notifications'
import * as selectors from '../../tools/reducers';
import { connect } from 'react-redux'
import { notification } from '../../tools/schemas/notifications';


const Notifications = ({ navigation ,notifications, userid, onLoad, deleteNotification}) => {
    const [isModalVisi, setModalVisible] = useState(false);
    useEffect(onLoad, [])
    return(
        <ImageBackground style={ theme.background }>
            <Container style={{ backgroundColor: 'transparent'}}>
                <Content>
                    <View>
                        <Modal 
                        isVisible={true}
                        onBackdropPress={() => setModalVisible(false) && navigation.navigate('home') }>
                            <View>
                                {
                                    notifications.map(notification => notification.user == userid &&(
                                        <Card>
                                            <CardItem header bordered style = {{display: "flex", flex: 1, alignItems: "center"}}>
                                                <View style={ styles.cardInfo }>
                                                    <Row>
                                                        <Col>
                                                            <Text style = {{fontSize: 15}}>{notification.title} </Text>
                                                        </Col>
                                                        <Right>
                                                            <Col>
                                                                <Button transparent onPress={ () => deleteNotification(notification.id)}>
                                                                    <FontAwesomeIcon style={{color: "gray",marginBottom:"220%"}} icon='trash' size={ 15 } />
                                                                </Button>
                                                            </Col>  
                                                        </Right>
                                                    </Row>
                                                </View>
                                            </CardItem>
                                            <CardItem>
                                                <View style={ styles.cardInfo }>
                                                    <Text style = {{fontSize: 15, color: "gray"}}>{notification.description}</Text>
                                                    <Text style = {{fontSize: 15, color: "gray", textAlign:"right"}}>{moment(notification.date).format('L LT')}</Text>
                                                </View>
                                            </CardItem>
                                        </Card>
                                    ))
                                }
                            </View>
                            {/* Aqui hay que quitar el boton, cuando se arregl el "onBackdropPress" del modal */}
                            <Button style={{width:"100%", textAlign:"center"}} onPress={ () => navigation.navigate('home') }>
                                <Text>Regresar</Text>
                            </Button> 
                        </Modal>
                    </View>
                </Content>
            </Container>
        </ImageBackground>
    )
}

export default connect(
    state => ({
        notifications: selectors.getNotifications(state),
        userid: selectors.getAuthUserID(state),
    }),
    dispatch =>({
        onLoad(){
            dispatch(actions.startGetNotifications())
        },
        deleteNotification(id){
            dispatch(actions.startDeleteNotification(id))
        }
    })
)
(Notifications)


const styles = StyleSheet.create({
    cardInfo: {
        width: "100%",
    }
})