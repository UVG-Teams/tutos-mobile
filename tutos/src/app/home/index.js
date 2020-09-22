import React, {component, useEffect} from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ImageBackground,
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

import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'
import { connect } from 'react-redux'

import * as actionsTutorProfile from '../../tools/actions/tutorProfile'

import * as selectors from '../../tools/reducers';
import * as actions from '../../tools/actions/tutorias'
import * as actionsProfile from '../../tools/actions/profile'
import { tutoria } from '../../tools/schemas/tutorias'
import profileReducer from '../../tools/reducers/profile'

const Home = ({ navigation, tutorias, onLoad, isTutor, profile , getTutorProfile}) => {
    const getTutorInfo = () => {
        if (profile.is_tutor) {
            getTutorProfile()
        }
    }
    useEffect(getTutorInfo , [])
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
                        onPress={ () => navigation.navigate('notifications') }
                    >
                        <FontAwesomeIcon style={ theme.headerIcon } icon='bell' size={ 25 } />
                    </Button>

                    <Button transparent
                        onPress={ () => navigation.navigate('inbox') }
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
                                    <CardItem header bordered onPress={() => alert("Que onda, esto es header")}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Programadas</Text>
                                    </CardItem>
                                    {
                                        tutorias.map(tutoria => tutoria.status.name === "scheduled" && (
                                            <CardItem bordered button key={tutoria.id} onPress={() => alert("info")}>
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
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>En curso</Text>
                                    </CardItem>
                                    {
                                        tutorias.map(tutoria => tutoria.status.name === "in_process" && (
                                            <CardItem bordered button key={tutoria.id} onPress={() => alert("info")}>
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
                                            <CardItem bordered button key={tutoria.id} onPress={() => alert("info")}>
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
                                            <CardItem bordered button key={tutoria.id} onPress={() => alert("Info")}>
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
                                            <CardItem bordered button key={tutoria.id} onPress={() => alert("info")}>
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
                                            <CardItem bordered button key={tutoria.id} onPress={() => alert("Información tutoria")}>
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
                            </>
                        )
                    }
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
        },
        getTutorProfile(){
            dispatch(actionsTutorProfile.startGetTutorProfile())
        }
    })
)(Home);