import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import dayjs from "dayjs"
import {
    Text,
    View,
    ImageBackground,
    StyleSheet,
} from 'react-native'

import {
    Container,
    Content,
    Tab,
    Tabs,
    Button,
    Header,
    Left,
    Right,
    Body,
    Title,
    Card,
    CardItem,
    Grid,
    Row,
    Col,
    List,
    ListItem,
} from 'native-base'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from '../../../layout/themes'

import * as selectors from '../../../tools/reducers'
import * as actions from '../../../tools/actions/tutorias'


const ListTutories = ({
    navigation,
    tutorias,
    isLoading,
    onLoad,
}) => {
    useEffect(onLoad, [])
    return(
        <Container style={{ backgroundColor: 'transparent'}}>
            <Header hasTabs style={ theme.header }>
                <Left>
                    <Button transparent
                        onPress={ () => navigation.openDrawer() }
                    >
                        <FontAwesomeIcon style={ theme.headerIcon } icon='bars' size={ 25 } />
                    </Button>
                </Left>
                <Body>
                    <Text style={{ fontSize: 25}}>
                        Tutorias
                    </Text>
                </Body>
                <Right></Right>
            </Header>

            <Tabs>
                <Tab heading="En curso"> 
                    <ImageBackground style={ theme.background }>
                        <Content style={ theme.content }>
                            <View>
                                <List>
                                    {
                                        tutorias.length == 0 && <Text>{'No hay'}</Text>
                                    }
                                    {
                                        tutorias.length > 0 && tutorias.map(tutoria =>
                                            tutoria && tutoria.status.name === "in_process" ? (
                                                <ListItem key={ tutoria.id }>
                                                    <Card style={ styles.cardTutoria }>
                                                        <CardItem
                                                            button
                                                            onPress={
                                                                () => navigation.navigate(
                                                                    'show', {
                                                                        id: tutoria.id
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Grid>
                                                                <Col>
                                                                    <Row>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ dayjs(tutoria.datetime).format('HH:mm') }</Text>
                                                                        </Col>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ 'Q.' + tutoria.total_price }</Text>
                                                                        </Col>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ tutoria.status.name }</Text>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row><Text style={ styles.tutoriaTitle }>{ 'Tutoria de ' + tutoria.course.name }</Text></Row>
                                                                    <Row><Text style={ styles.tutoriaParticipant }>{ 'Tutor ' + tutoria.tutor.first_name + ' ' + tutoria.tutor.last_name }</Text></Row>
                                                                    <Row><Text style={ styles.tutoriaParticipant }>{ 'Tutorado ' + tutoria.tutorado.first_name + ' ' + tutoria.tutorado.last_name }</Text></Row>
                                                                </Col>
                                                            </Grid>
                                                        </CardItem>
                                                    </Card>
                                                </ListItem>
                                            ):(<></>)
                                        )
                                    }
                                </List>
                            </View>
                        </Content>
                    </ImageBackground>
                </Tab>
                
                <Tab heading="Programadas">
                    <ImageBackground style={ theme.background }>
                        <Content style={ theme.content }>
                            <View>
                                <List>
                                    {
                                        tutorias.length == 0 && <Text>{'No hay'}</Text>
                                    }
                                    {
                                        tutorias.length > 0 && tutorias.map(tutoria =>
                                            tutoria && tutoria.status.name === "scheduled" ? (
                                                <ListItem key={ tutoria.id }>
                                                    <Card style={ styles.cardTutoria }>
                                                        <CardItem
                                                            button
                                                            onPress={
                                                                () => navigation.navigate(
                                                                    'show', {
                                                                        id: tutoria.id
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Grid>
                                                                <Col>
                                                                    <Row>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ dayjs(tutoria.datetime).format('HH:mm') }</Text>
                                                                        </Col>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ 'Q.' + tutoria.total_price }</Text>
                                                                        </Col>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ tutoria.status.name }</Text>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row><Text style={ styles.tutoriaTitle }>{ 'Tutoria de ' + tutoria.course.name }</Text></Row>
                                                                    <Row><Text style={ styles.tutoriaParticipant }>{ 'Tutor ' + tutoria.tutor.first_name + ' ' + tutoria.tutor.last_name }</Text></Row>
                                                                    <Row><Text style={ styles.tutoriaParticipant }>{ 'Tutorado ' + tutoria.tutorado.first_name + ' ' + tutoria.tutorado.last_name }</Text></Row>
                                                                </Col>
                                                            </Grid>
                                                        </CardItem>
                                                    </Card>
                                                </ListItem>
                                            ):(<></>)
                                        )
                                    }
                                </List>
                            </View>
                        </Content>
                    </ImageBackground>
                </Tab>
                <Tab heading="Terminadas">
                    <ImageBackground style={ theme.background }>
                        <Content style={ theme.content }>
                            <View>
                                <List>
                                    {
                                        tutorias.length == 0 && <Text>{'No hay'}</Text>
                                    }
                                    {
                                        tutorias.length > 0 && tutorias.map(tutoria =>
                                            tutoria && tutoria.status.name === "end" ? (
                                                <ListItem key={ tutoria.id }>
                                                    <Card style={ styles.cardTutoria }>
                                                        <CardItem
                                                            button
                                                            onPress={
                                                                () => navigation.navigate(
                                                                    'show', {
                                                                        id: tutoria.id
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Grid>
                                                                <Col>
                                                                    <Row>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ dayjs(tutoria.datetime).format('HH:mm') }</Text>
                                                                        </Col>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ 'Q.' + tutoria.total_price }</Text>
                                                                        </Col>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ tutoria.status.name }</Text>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row><Text style={ styles.tutoriaTitle }>{ 'Tutoria de ' + tutoria.course.name }</Text></Row>
                                                                    <Row><Text style={ styles.tutoriaParticipant }>{ 'Tutor ' + tutoria.tutor.first_name + ' ' + tutoria.tutor.last_name }</Text></Row>
                                                                    <Row><Text style={ styles.tutoriaParticipant }>{ 'Tutorado ' + tutoria.tutorado.first_name + ' ' + tutoria.tutorado.last_name }</Text></Row>
                                                                </Col>
                                                            </Grid>
                                                        </CardItem>
                                                    </Card>
                                                </ListItem>
                                            ):(<></>)
                                        )
                                    }
                                </List>
                            </View>
                        </Content>
                    </ImageBackground>
                </Tab>
                <Tab heading="Canceladas">
                    <ImageBackground style={ theme.background }>
                        <Content style={ theme.content }>
                            <View>
                                <List>
                                    {
                                        tutorias.length == 0 && <Text>{'No hay'}</Text>
                                    }
                                    {
                                        tutorias.length > 0 && tutorias.map(tutoria =>
                                            tutoria && tutoria.status.name === "canceled" ? (
                                                <ListItem key={ tutoria.id }>
                                                    <Card style={ styles.cardTutoria }>
                                                        <CardItem
                                                            button
                                                            onPress={
                                                                () => navigation.navigate(
                                                                    'show', {
                                                                        id: tutoria.id
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Grid>
                                                                <Col>
                                                                    <Row>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ dayjs(tutoria.datetime).format('HH:mm') }</Text>
                                                                        </Col>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ 'Q.' + tutoria.total_price }</Text>
                                                                        </Col>
                                                                        <Col>
                                                                            <Text style={ styles.tutoriaImportant }>{ tutoria.status.name }</Text>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row><Text style={ styles.tutoriaTitle }>{ 'Tutoria de ' + tutoria.course.name }</Text></Row>
                                                                    <Row><Text style={ styles.tutoriaParticipant }>{ 'Tutor ' + tutoria.tutor.first_name + ' ' + tutoria.tutor.last_name }</Text></Row>
                                                                    <Row><Text style={ styles.tutoriaParticipant }>{ 'Tutorado ' + tutoria.tutorado.first_name + ' ' + tutoria.tutorado.last_name }</Text></Row>
                                                                </Col>
                                                            </Grid>
                                                        </CardItem>
                                                    </Card>
                                                </ListItem>
                                            ):(<></>)
                                        )
                                    }
                                </List>
                            </View>
                        </Content>
                    </ImageBackground>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default connect(
    state => ({
        tutorias: selectors.getTutorias(state),
        isLoading: selectors.isFetchingTutorias(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startGetTutorias());
        },
    }),
)(ListTutories);

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        margin: 2,
        flex: 1,
    },
    tutoriaImportant: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 15,
    },
    tutoriaTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    tutoriaParticipant: {
        fontSize: 12,
    },
    contentView: {
        marginTop: 20
    },
    cardTutoria: {
        flex: 1,
    }
})