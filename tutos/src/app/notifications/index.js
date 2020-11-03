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

import * as actions from '../../tools/actions/notifications'
import * as selectors from '../../tools/reducers';
import { connect } from 'react-redux'
import { notification } from '../../tools/schemas/notifications';


const Notifications = ({ navigation ,notifications, userid, onLoad, deleteNotification}) => {
    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = (id) => {
        setModalID(id)
        setModalVisible(!isModalVisible);
    };
    useEffect(onLoad, [])
    return(
        <ImageBackground style={ theme.background }>
            <Container style={{ backgroundColor: 'transparent'}}>
                <Content style={ theme.content }>
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
                                                            <Text style = {{fontSize: 15, marginTop: 2}}>{notification.title} </Text>
                                                        </Col>
                                                        <Right>
                                                            <Col>
                                                                <Button transparent onPress={ () => deleteNotification(notification.id)}>
                                                                    <FontAwesomeIcon style={{color: "gray"}} icon='trash' size={ 15 } />
                                                                </Button>
                                                            </Col>  
                                                        </Right>
                                                    </Row>
                                                </View>
                                            </CardItem>
                                            <CardItem header bordered>
                                                <Row>
                                                    <View style={ styles.cardInfo }>
                                                        <Text style = {{fontSize: 15, color: "gray"}}>{notification.description}</Text>
                                                    </View>
                                                </Row>
                                                <Row>
                                                    <View style={ styles.cardInfo }>
                                                        <Text style = {{fontSize: 15, color: "gray"}}>{notification.date}</Text>
                                                    </View>
                                                </Row>
                                            </CardItem>
                                        </Card>
                                    ))
                                }
                            </View>
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