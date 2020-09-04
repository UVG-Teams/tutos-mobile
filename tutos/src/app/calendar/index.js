import React from 'react'
import { connect } from 'react-redux'
import {
    Text,
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
} from 'native-base'
import dayjs from "dayjs"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Calendar as CalendarComponent } from 'react-native-calendars'

import { theme } from './../../layout/themes'
import * as actions from '../../tools/actions/selects'
import * as selectors from '../../tools/reducers'
import Today from '../today'

// Event types
const tutoria = { color: 'red' }
const other = { color: 'blue' }

const getEventType = enumType => {
    switch (enumType) {
        case 'tutoria':
            return tutoria
        case 'otra':
            return other
        default:
            return tutoria
    }
}

const Calendar = ({
    navigation,
    events,
    selectDay,
    daysEvents = {},
    weekStartsOn,
    createEvent,
}) => (
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
                <Right></Right>
            </Header>
            <Content style={ theme.content }>
                <View>
                    {
                        events.map(event => {
                            const event_date = dayjs(event.datetime).format('YYYY-MM-DD')
                            if (daysEvents[event_date] && daysEvents[event_date]['dots']) {
                                daysEvents[event_date]['dots'].push(getEventType(event.event_type))
                            } else if (daysEvents[event_date]) {
                                daysEvents[event_date]['dots'] = [getEventType(event.event_type)]
                            } else {
                                daysEvents[event_date] = {dots: [getEventType(event.event_type)]}
                            }
                        })
                    }
                    <CalendarComponent
                        markingType={ 'multi-dot' }
                        onDayPress={ day => selectDay(day.dateString) }
                        onDayLongPress={ day => createEvent(day.dateString) }
                        markedDates={ daysEvents }
                        // onMonthChange={(month) => {console.log('month changed', month)}}
                        firstDay={ weekStartsOn }
                        style={ calendarStyles }
                        theme={ calendarTheme }
                    />
                    <Today />
                </View>
            </Content>
        </Container>
    </ImageBackground>
)

export default connect(
    state => ({
        events: selectors.getTutorias(state),
        weekStartsOn: 0, // Sunday
    }),
    dispatch => ({
        createEvent(day) {
            alert("Crear evento", day)
        },
        selectDay(day) {
            dispatch(actions.selectDay(day))
        },
    }),
)(Calendar)

const calendarTheme = {
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
}

const calendarStyles = {
    borderWidth: 1,
    borderColor: 'gray',
    height: 370,
}
