import React, { useEffect } from 'react'
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
import { Calendar as CalendarComponent, LocaleConfig } from 'react-native-calendars'

import { theme } from './../../layout/themes'
import * as actions from '../../tools/actions/selects'
import * as eventActions from '../../tools/actions/events'
import * as selectors from '../../tools/reducers'
import Today from './today'

LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago.','Sep.','Oct.','Nov.','Dic.'],
    dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
    dayNamesShort: ['Do','Lun','Mar','Mie','Jue','Vie','Sáb'],
    today: 'Hoy'
};

LocaleConfig.defaultLocale = 'es';

// Event types
const tutoria = { color: 'red' }
const social = { color: 'blue' }
const personal = {color: 'green'}
const other = {color: 'yellow'}

const getEventType = enumType => {
    switch (enumType) {
        case 'tutoria':
            return tutoria
        case 'social':
            return social
        case 'personal':
            return personal
        case 'other':
            return other
        default:
            return other
    }
}

const Calendar = ({
    navigation,
    events,
    selectDay,
    daysEvents = {},
    weekStartsOn,
    createEvent,
    onLoad,
}) => {
    useEffect(onLoad,[])
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
                        <Button transparent onPress={ () => navigation.navigate('events', {screen: 'new'})}>
                            <FontAwesomeIcon style={ theme.headerIcon } icon='plus-circle' size={ 25 } />
                        </Button>
                    </Right>
                </Header>
                <Content style={ theme.content }>
                    <View>
                        {
                            events.map(event => {
                                const event_date = dayjs(event.datetime).format('YYYY-MM-DD')
                                if (daysEvents[event_date] && daysEvents[event_date]['dots']) {
                                    daysEvents[event_date]['dots'].push(getEventType(event.typeEvent))
                                } else if (daysEvents[event_date]) {
                                    daysEvents[event_date]['dots'] = [getEventType(event.typeEvent)]
                                } else {
                                    daysEvents[event_date] = {dots: [getEventType(event.typeEvent)]}
                                }
                            })
                        }
                        <CalendarComponent
                            markingType={ 'multi-dot' }
                            onDayPress={ day => selectDay(day.dateString) }
                            onDayLongPress={ day =>  navigation.navigate('events', {screen: 'new'})}
                            markedDates={ daysEvents }
                            // onMonthChange={(month) => {console.log('month changed', month)}}
                            firstDay={ weekStartsOn }
                            style={ calendarStyles }
                            theme={ calendarTheme }
                        />
                        <Today navigation={ navigation } />
                    </View>
                </Content>
            </Container>
        </ImageBackground>
    )
}

export default connect(
    state => ({
        events: selectors.getEvents(state),
        weekStartsOn: 0, // Sunday
    }),
    dispatch => ({
        onLoad(){
            dispatch(eventActions.startGetEvents())
        },
        selectDay(day) {
            dispatch(actions.selectDay(day))
        },
    }),
)(Calendar)

const calendarTheme = {
    // textDayFontFamily: 'monospace',
    // textMonthFontFamily: 'monospace',
    // textDayHeaderFontFamily: 'monospace',
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
