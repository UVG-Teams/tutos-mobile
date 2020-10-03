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
    List,
    Col,
    Row,
} from 'native-base'

import Modal from 'react-native-modal';

import { TouchableOpacity } from 'react-native-gesture-handler'

import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'
import { connect } from 'react-redux'

import * as selectors from '../../tools/reducers';
import * as actions from '../../tools/actions/tutorias'
import * as actionsProfile from '../../tools/actions/profile'
import { tutoria } from '../../tools/schemas/tutorias'
import profileReducer from '../../tools/reducers/profile'

import Profile from '../profile'



const Home = ({ navigation, tutorias, onLoad, isTutor, profile}) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalID, setModalID] = useState(null);
    const toggleModal = (id) => {
        setModalID(id)
        setModalVisible(!isModalVisible);
    };

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;
    useEffect(onLoad, [])
    if (isTutor){
        tutorias = tutorias.filter(tutoria => tutoria.tutor.id === profile.id)
    }else{
        tutorias = tutorias.filter(tutoria => tutoria.tutorado.id === profile.id)
    }
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
                    <Right>
                        <Button transparent
                            onPress={ () => navigation.navigate('Notifications') }
                        >
                            <FontAwesomeIcon style={ theme.headerIcon } icon='bell' size={ 25 } />
                        </Button>

                        <Button transparent
                            onPress={ () => navigation.navigate('Inbox') }
                        >
                            <FontAwesomeIcon style={ theme.headerIcon } icon='inbox' size={ 25 } />
                        </Button>
                    </Right>
                </Header>
                <Content style={ theme.content }>
                    <View>
                        {
                            isTutor ? (
                                <>
                                    <Card>
                                        <CardItem header bordered>
                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Programadas</Text>
                                        </CardItem>
                                        {
                                            tutorias.map(tutoria => tutoria.status.name === "scheduled" && (
                                                <CardItem bordered button onPress={() => toggleModal(tutoria.id)}>
                                                    <Body>
                                                        <Row>
                                                            <Col>
                                                                <Text>{tutoria.course.name}, {tutoria.tutorado.first_name}</Text>
                                                            </Col>
                                                            <Col>
                                                                <Text style={{textAlign: 'right'}}>{moment(tutoria.datetime).format('L LT')}</Text>
                                                            </Col>
                                                        </Row>
                                                    </Body>
                                                </CardItem>
                                            ))
                                        }
                                    </Card>

                                    <Card>
                                        <CardItem header bordered>
                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>En curso</Text>
                                        </CardItem>
                                        {
                                            tutorias.map(tutoria => tutoria.status.name === "in_process" && (
                                                <CardItem bordered button onPress={() => toggleModal(tutoria.id)}>
                                                    <Body>
                                                        <Row>
                                                            <Col>
                                                                <Text>{tutoria.course.name}, {tutoria.tutorado.first_name}</Text>
                                                            </Col>
                                                            <Col>
                                                                <Text style={{textAlign: 'right'}}>{moment(tutoria.datetime).format('L LT')}</Text>
                                                            </Col>
                                                        </Row>
                                                    </Body>
                                                </CardItem>
                                            ))
                                        }
                                    </Card>

                                    <Card>
                                        <CardItem header bordered onPress={() => alert("info")}>
                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Terminadas</Text>
                                        </CardItem>
                                        {
                                            tutorias.map(tutoria => tutoria.status.name === "end" && (
                                                <CardItem bordered button onPress={() => toggleModal(tutoria.id)}>
                                                    <Body>
                                                        <Row>
                                                            <Col>
                                                                <Text>{tutoria.course.name}, {tutoria.tutorado.first_name}</Text>
                                                            </Col>
                                                            <Col>
                                                                <Text style={{textAlign: 'right'}}>{moment(tutoria.datetime).format('L LT')}</Text>
                                                            </Col>
                                                        </Row>
                                                    </Body>
                                                </CardItem>
                                            ))
                                        }
                                    </Card>

                                    <Card>
                                        <CardItem header bordered onPress={() => alert("info")}>
                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Canceladas</Text>
                                        </CardItem>
                                        {
                                            tutorias.map(tutoria => tutoria.status.name === "canceled" && (
                                                <CardItem bordered button onPress={() => toggleModal(tutoria.id)}>
                                                    <Body>
                                                        <Row>
                                                            <Col>
                                                                <Text>{tutoria.course.name}, {tutoria.tutorado.first_name}</Text>
                                                            </Col>
                                                            <Col>
                                                                <Text style={{textAlign: 'right'}}>{moment(tutoria.datetime).format('L LT')}</Text>
                                                            </Col>
                                                        </Row>
                                                    </Body>
                                                </CardItem>
                                            ))
                                        }
                                    </Card>
                                </>
                            ):(
                                <>
                                    <Card>
                                        <CardItem header bordered>
                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Pasadas</Text>
                                        </CardItem>
                                        {
                                            tutorias.map(tutoria => tutoria.status.name ===  "end" && (
                                                <CardItem bordered button onPress={() => toggleModal(tutoria.id)}>
                                                    <Body>
                                                        <Row>
                                                            <Col>
                                                                <Text>{tutoria.course.name}, {tutoria.tutor.first_name}</Text>
                                                            </Col>
                                                            <Col>
                                                                <Text style={{textAlign: 'right'}}>{moment(tutoria.datetime).format('L LT')}</Text>
                                                            </Col>
                                                        </Row>
                                                    </Body>
                                                </CardItem>
                                            ))
                                        }
                                    </Card>

                                    <Card>
                                        <CardItem header bordered>
                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Programadas</Text>
                                        </CardItem>
                                        {
                                            tutorias.map(tutoria => tutoria.status.name ===  "scheduled" && (
                                                <>
                                                    <CardItem bordered button onPress={() => toggleModal(tutoria.id)}>
                                                        <Body>
                                                            <Row>
                                                                <Col>
                                                                    <Text>{tutoria.course.name}, {tutoria.tutor.first_name}</Text>
                                                                </Col>
                                                                <Col>
                                                                    <Text style={{textAlign: 'right'}}>{moment(tutoria.datetime).format('L LT')}</Text>
                                                                </Col>
                                                            </Row>
                                                        </Body>
                                                    </CardItem>
                                                </>
                                            ))
                                        }
                                    </Card>
                                </>
                            )
                        }
                        {/* https://github.com/react-native-community/react-native-modal */}
                        <Modal 
                            deviceWidth={deviceWidth} 
                            deviceHeight={deviceHeight} 
                            isVisible={isModalVisible} 
                            onBackdropPress={() => setModalVisible(false)}>
                            <View>
                                <Card>
                                    <CardItem header bordered>
                                        {/* {console.log("info", tutorias)} */}
                                        {console.log("Modal id: ", modalID)}
                                        {tutorias.map(tutoria => {
                                            if (tutoria.id === modalID){
                                                return (
                                                    <View style={ styles.cardInfo }>
                                                        <Text style = {{fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center"}}>Información Tutoría</Text>
                                                        {console.log(tutoria)}
                                                        {isTutor ? (
                                                            
                                                            <Text style = {{fontSize: 18}}>Tutorado: {tutoria.tutorado.first_name} {tutoria.tutorado.last_name}</Text>
                                                        ) : (
                                                            <Text style = {{fontSize: 18}}>Tutor: {tutoria.tutor.first_name} {tutoria.tutor.last_name}</Text>
                                                        ) 
                                                        }
                                                        <Text style = {{fontSize: 18}}>Curso: {tutoria.course.name}</Text>
                                                        <Text style = {{fontSize: 18}}>Tema: {tutoria.topic}</Text>
                                                        <Text style = {{fontSize: 18}}>Precio: Q{tutoria.total_price}</Text>
                                                        <Text style = {{fontSize: 18}}>Ubicación: {tutoria.location}</Text>
                                                        <Text style = {{fontSize: 18}}>Fecha: {moment(tutoria.datetime).format('L LT')}</Text>
                                                    </View>
                                                )
                                            }
                                        })}
                                    </CardItem>
                                </Card>
                                <TouchableOpacity style={ styles.buttonLogin } onPress={ toggleModal } >
                                    <Text style={styles.txtButtonLogin}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                </Content>
            </Container>
        </ImageBackground>
)}

export default connect(
    state => ({
        tutorias: selectors.getTutorias(state),
        isTutor: selectors.getProfile(state).is_tutor,
        profile: selectors.getProfile(state),
    }),
    dispatch => ({
        onLoad(){
            dispatch(actions.startGetTutorias())
            dispatch(actionsProfile.startGetProfile())
        }
    })
)(Home);


const styles = StyleSheet.create({
    buttonLogin: {
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: '#146dc7',
        color: 'white',
        paddingLeft: '39%',
        paddingRight: '39%',
        paddingTop: 7,
        paddingBottom: 7,
    },
    txtButtonLogin: {
        color: 'white',
        fontSize: 19,
    },
    cardInfo: {
        width: "100%",
    }
})
