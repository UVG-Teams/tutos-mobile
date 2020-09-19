import React from 'react'
import { connect } from 'react-redux'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'
import dayjs from 'dayjs'
import { Content, List, ListItem, Card, CardItem, Grid, Col, Row } from 'native-base'

import { theme } from './../../../layout/themes'
import * as selectors from '../../../tools/reducers'


const Today = ({
    navigation,
    events,
    selectedDay,
}) => (
    <Content style={ styles.contentView }>
        <View>
            <Text style={ styles.title }>
                { selectedDay == dayjs().format('YYYY-MM-DD') ? 'TODAY' : dayjs(selectedDay).format('DD/MM/YYYY') }
            </Text>
            <List>
                {
                    events.length == 0 && <Text>{'No hay'}</Text>
                }
                {
                    events.length > 0 && events.map(event =>
                        <ListItem key={ event.id }>
                            <Card style={ styles.cardEvent }>
                                <CardItem
                                    button
                                    onPress={
                                        () => navigation.navigate(
                                            'events', {
                                                screen: 'show',
                                                params: { id: event.id }
                                            }
                                        )
                                    }
                                >
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
                            </Card>
                        </ListItem>
                    )
                }
            </List>
        </View>
    </Content>
)

export default connect(
    (state, { today }) => ({
        state: state,
        selectedDay: (today ? dayjs().format('YYYY-MM-DD') : selectors.getSelectedDay(state)) || dayjs().format('YYYY-MM-DD'),
    }),
    dispatch => ({}),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        events: selectors.getTutoriasOnDate(stateProps.state, stateProps.selectedDay),
    }),
)(Today)

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        margin: 2,
        flex: 1,
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
    contentView: {
        marginTop: 20
    },
    cardEvent: {
        flex: 1,
    }
})