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

import { Calendar as CalendarComponent } from 'react-native-calendars'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


import { theme } from './../../layout/themes'


const Calendar = ({
    navigation,
    events,
    selectDay,
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
                    <Text style={{ fontSize: 35 }}>Calendar</Text>
                    <CalendarComponent
                        markingType={ 'multi-dot' }
                        markedDates={{
                            '2020-08-10': {dots: [{color: 'blue'}, {color: 'red'}]},
                            '2020-08-16': {dots: [{color: 'blue'}]},
                        }}
                        onDayPress={ day => selectDay(day.dateString) }
                        onDayLongPress={ day => createEvent(day.dateString) }
                        // onMonthChange={(month) => {console.log('month changed', month)}}
                        firstDay={ 0 }
                        style={ calendarStyles }
                        theme={ calendarTheme }
                    />
                </View>
            </Content>
        </Container>
    </ImageBackground>
)

export default connect(
    state => ({
        events: [],
        // selectedDay: selectors.getSelectedDay(state.driver) || dayjs().format('YYYY-MM-DD'),
        weekStartsOn: 0, // Sunday
    }),
    dispatch => ({
        createEvent(day) {
            console.log("Crear evento", day)
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
