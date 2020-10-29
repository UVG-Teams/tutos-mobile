import React, { useEffect } from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ImageBackground,
    Image,
    StyleSheet
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
    Separator,
    List, 
    ListItem,
} from 'native-base'
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import dayjs from 'dayjs'

import { theme } from './../../../layout/themes'

import * as selectors from '../../../tools/reducers'


const Show = ({ navigation, tutoria, onLoad }) => {
    return (
        <ImageBackground
            style={ theme.background }
        >
            <Container style={{ backgroundColor: 'transparent' }}>
                <Header style={ theme.header }>
                    <Left>
                        <Button transparent
                            onPress={ () => navigation.openDrawer() }
                        >
                            <FontAwesomeIcon style={ theme.headerIcon } icon='bars' size={ 25 } />
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <Content style={ theme.content }>
                    <Card style={{ flex:1 }}>
                        <CardItem header bordered>
                            <Row><Text style={ styles.title }>{ 'Tutoria de ' + tutoria.course.name }</Text></Row>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Text style={ styles.tutoriaImportant }>{ dayjs(tutoria.datetime).format('DD/MM/YYYY HH:mm') }</Text>
                                        </Col>
                                        <Col>
                                            <Text style={ styles.tutoriaImportant }>{ tutoria.status.name }</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Grid>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Row>
                                    <Col>
                                        <Row><Text style={ styles.label }>{'Tutor'}</Text></Row>
                                        <Row><Text style={ styles.label }>{'Tutorado'}</Text></Row>
                                    </Col>
                                    <Col>
                                        <Row><Text style={ styles.tutoriaParticipant }>{ tutoria.tutor.first_name + ' ' + tutoria.tutor.last_name }</Text></Row>
                                        <Row><Text style={ styles.tutoriaParticipant }>{ tutoria.tutorado.first_name + ' ' + tutoria.tutorado.last_name }</Text></Row>
                                    </Col>
                                </Row>
                            </Grid>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Row>
                                    <Col>
                                        <Row><Text style={ styles.label }>{'Precio'}</Text></Row>
                                    </Col>
                                    <Col>
                                        <Text style={ styles.tutoriaImportant }>{ 'Q.' + tutoria.total_price }</Text>
                                    </Col>
                                </Row>
                            </Grid>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Row><Text style={ styles.label }>{'Descripcion'}</Text></Row>
                                    <Row><Text style={ styles.text }>{ tutoria.description }</Text></Row>
                                </Col>
                            </Grid>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        </ImageBackground>
    )
}

export default connect(
    (state, { route }) => ({
        tutoria: selectors.getTutoria(state, route.params.id),
    }),
    dispatch => ({})
)(Show)

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    text: {
        fontSize: 17,
    },
    cardHeader: {
        fontWeight: 'bold',
    },
    tutoriaImportant: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 15,
    },
    tutoriaParticipant: {
        fontSize: 15,
    },
})
