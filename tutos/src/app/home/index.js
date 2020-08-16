import React, {component} from 'react'
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

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'
import { connect } from 'react-redux'


const Home = ({ navigation, tutorias}) => (
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
                    <Card>
                        <CardItem header bordered onPress={() => alert("Que onda, esto es header")}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Programadas</Text>
                        </CardItem>
                        {
                            tutorias.map(tutoria => tutoria.status === "Programada" && (
                                <CardItem bordered button onPress={() => alert("{tutoria.materia} {tutoria.tutorado}")}>
                                    <Body>
                                        <Row>
                                            <Col>
                                                <Text>{tutoria.materia} {tutoria.tutorado}</Text>
                                            </Col>
                                            <Col>
                                                <Text style={{textAlign: 'right'}}>{tutoria.fechaHora}</Text>
                                            </Col>
                                        </Row>
                                    </Body>
                                </CardItem>
                            ))
                        }
                    </Card>

                    <Card>
                        <CardItem header bordered onPress={() => alert("Que onda, esto es header")}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>En curso</Text>
                        </CardItem>
                        {
                            tutorias.map(tutoria => tutoria.status === "En curso" && (
                                <CardItem bordered button onPress={() => alert("Hola, esto es el body")}>
                                    <Body>
                                        <Row>
                                            <Col>
                                                <Text>{tutoria.materia} {tutoria.tutorado}</Text>
                                            </Col>
                                            <Col>
                                                <Text style={{textAlign: 'right'}}>{tutoria.fechaHora}</Text>
                                            </Col>
                                        </Row>
                                    </Body>
                                </CardItem>
                            ))
                        }
                    </Card>

                    <Card>
                        <CardItem header bordered onPress={() => alert("Que onda, esto es header")}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Terminadas</Text>
                        </CardItem>
                        {
                            tutorias.map(tutoria => tutoria.status === "Terminada" && (
                                <CardItem bordered button onPress={() => alert("Hola, esto es el body")}>
                                    <Body>
                                        <Row>
                                            <Col>
                                                <Text>{tutoria.materia} {tutoria.tutorado}</Text>
                                            </Col>
                                            <Col>
                                                <Text style={{textAlign: 'right'}}>{tutoria.fechaHora}</Text>
                                            </Col>
                                        </Row>
                                    </Body>
                                </CardItem>
                            ))
                        }
                    </Card>
                </View>
            </Content>
        </Container>
    </ImageBackground>
)

export default connect(
    state => ({
        tutorias: [{tutorado: "Willi", materia: "Estadistica", status: "Programada", fechaHora: "25/08 15:00:00"},
            {tutorado: "Andy", materia: "IPC", status: "Programada", fechaHora: "26/08 17:30:00"},
            {tutorado: "Block", materia: "Fisica 3", status: "Programada", fechaHora: "27/08 15:00:00"},
            {tutorado: "Willi", materia: "Estadistica", status: "En curso", fechaHora: "20/08 15:00:00"},
            {tutorado: "Willi", materia: "Estadistica", status: "Terminada", fechaHora: "18/08 15:00:00"},
            {tutorado: "Luca", materia: "Ecuaciones Diferenciales", status: "Terminada", fechaHora: "15/08 15:00:00"},
            {tutorado: "Marco", materia: "Android", status: "Terminada", fechaHora: "11/08 15:00:00"}]
    })
)(Home);