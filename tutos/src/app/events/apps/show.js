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


const Show = ({ navigation, event }) => {
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
                            {/* <Text style={ styles.title }>{ event.title }</Text> */}
                        </CardItem>
                        <CardItem>
                            {
                                console.log(event)
                            }
                            <Grid>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Text style={ styles.eventImportant }>{ dayjs(event.datetime).format('HH:mm') }</Text>
                                        </Col>
                                        <Col>
                                            <Text style={ styles.eventImportant }>{ 'Q.' + event.total_price }</Text>
                                        </Col>
                                        <Col>
                                            <Text style={ styles.eventImportant }>{ event.status.name }</Text>
                                        </Col>
                                    </Row>
                                    <Row><Text style={ styles.eventTitle }>{ 'Tutoria de ' + event.course.name }</Text></Row>
                                    <Row><Text style={ styles.eventParticipant }>{ 'Tutor ' + event.tutor.first_name + ' ' + event.tutor.last_name }</Text></Row>
                                    <Row><Text style={ styles.eventParticipant }>{ 'Tutorado ' + event.tutorado.first_name + ' ' + event.tutorado.last_name }</Text></Row>
                                </Col>
                            </Grid>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Row><Text style={ styles.label }>{'Description'}</Text></Row>
                                    {/* <Row><Text style={ styles.text }>{ event.description }</Text></Row> */}
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
        event: selectors.getTutoria(state, route.params.id),
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
    eventImportant: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 15,
    },
    eventTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    eventParticipant: {
        fontSize: 12,
    },
})
