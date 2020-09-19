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
                            <Text style={ styles.title }>{ event.title }</Text>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Row><Text style={ styles.label }>{'Organizer'}</Text></Row>
                                    <Row><Text style={ styles.text }>{ event.user_main_id }</Text></Row>
                                </Col>
                                <Col>
                                    <Row><Text style={ styles.label }>{'Date'}</Text></Row>
                                    <Row><Text style={ styles.text }>{ dayjs(event.date).format('DD/MMMM/YYYY') }</Text></Row>
                                    {
                                        event.start && event.end && 
                                            <Row><Text style={ styles.text }>{ dayjs(event.start).format('HH:mm') + ' - ' + dayjs(event.end).format('HH:mm') }</Text></Row>
                                    }
                                </Col>
                            </Grid>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Row><Text style={ styles.label }>{'Address'}</Text></Row>
                                    <Row><Text style={ styles.text }>{ event.location }</Text></Row>
                                </Col>
                            </Grid>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Row><Text style={ styles.label }>{'Type of event'}</Text></Row>
                                    <Row><Text style={ styles.text }>{ event.event_type }</Text></Row>
                                </Col>
                                <Col>
                                    <Row><Text style={ styles.label }>{'Public'}</Text></Row>
                                    <Row><Text style={ styles.text }>{ event.public ? 'True' : 'False' }</Text></Row>
                                </Col>
                            </Grid>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Row><Text style={ styles.label }>{'Description'}</Text></Row>
                                    <Row><Text style={ styles.text }>{ event.description }</Text></Row>
                                </Col>
                            </Grid>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem
                            button
                            onPress={() => alert("Go to project")}
                        >
                            <Text style={ styles.label }>{'Go to project'}</Text>
                        </CardItem>
                        <CardItem
                            button
                            onPress={() => alert("Edit event")}
                        >
                            <Text style={ styles.label }>{'Edit'}</Text>
                        </CardItem>
                        {/* <CardItem
                            button
                            onPress={() => alert("Delete event")}
                        >
                            <Text style={ styles.label }>{'Delete'}</Text>
                        </CardItem> */}
                    </Card>
                </Content>
            </Container>
        </ImageBackground>
    )
}

export default connect(
    (state, { id }) => ({
        event: {}
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
    }
})
