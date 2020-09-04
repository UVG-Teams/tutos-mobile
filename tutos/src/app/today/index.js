import React from 'react'
import { connect } from 'react-redux'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'
import dayjs from 'dayjs'
import { Content, List, ListItem, Card, CardItem, Grid, Col, Row } from 'native-base'

import { theme } from './../../layout/themes'
import * as selectors from '../../tools/reducers'


const Today = ({
    events,
    navigation,
    selectedDay,
}) => (
    <Content style={ theme.content }>
        <View>
            <Text style={{ fontSize: 25 }}>{ dayjs(selectedDay).format('DD/MM/YYYY') }</Text>
            <List>
                {
                    events.length == 0 && <Text>{'No hay'}</Text>
                }
                {console.log(events)}
                {
                    events.length > 0 && events.map(event =>
                        <ListItem key={ event.id }>
                            <Card  style={{ flex:1 }}>
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
                                            {
                                                event.start && event.end && 
                                                    <Row><Text style={ styles.eventHora }>{ dayjs(event.start).format('HH:mm') + ' - ' + dayjs(event.end).format('HH:mm') }</Text></Row>
                                            }
                                            <Row><Text style={ styles.eventTitle }>{ event.title }</Text></Row>
                                            <Row><Text style={ styles.eventType }>{ event.event_type }</Text></Row>
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
        selectedDay: today ? dayjs().format('YYYY-MM-DD') : selectors.getSelectedDay(state),
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
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    eventHora: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 15,
    },
    eventTitle: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 16,
    },
    eventType: {
        fontFamily: 'monospace',
        fontSize: 12,
    },
})
