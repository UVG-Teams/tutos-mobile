import React, { useEffect } from 'react'
import {
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native'

import { 
    Container,
    Content,
    Button,
    Header,
    Left,
    Body,
    Right,
    DatePicker,
    Picker,
} from 'native-base'

import { RenderInput, RenderInputNumeric } from '../../../components/form/field'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import dayjs from 'dayjs'

import { theme } from './../../../layout/themes'

import * as selectors from '../../../tools/reducers'
import * as actions from '../../../tools/actions/events'
import DateTimePicker from '@react-native-community/datetimepicker';

const renderDatePicker = ({input:{onChange, value, placeholder,...restInput}}) => (
    <DatePicker
        defaultDate={new Date(2019, 1, 1)}
        minimumDate={new Date(1920, 1, 1)}
        maximumDate={new Date(2021, 1, 1)}
        locale={'en'}
        modalTransparent={false}
        animationType={'fade'}
        androidMode={'default'}
        placeHolderText='Fecha de Evento'
        textStyle={{color:'black'}}
        disabled={false}
        onDateChange={onChange}
        value={value}
    />
)
const renderPickerEventType = ({input:{onChange, value, placeholder, ...restInput}}) => (
    <Picker
        style={{borderWidth:1, borderStyle:"solid", width:107, marginBottom:10}}
        note
        mode='dropdown'
        selectedValue={value}
        onValueChange={onChange}
    >
        <Picker.Item label='Tutoria' value='tutoria'/>
        <Picker.Item label='Social' value='social'/>
        <Picker.Item label='Personal' value='personal'/>
        <Picker.Item label='Otros' value='other'/>
    </Picker>
)

const New = ({ navigation, handleSubmit}) => {
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
                    <Text>Crear Evento</Text>
                    <Field
                        name='title'
                        placeholder='Titulo'
                        component={RenderInput}
                    />
                    <Field
                        name='description'
                        placeholder='Descripcion'
                        component={RenderInput}
                    />
                    <Field
                        name='eventDate'
                        component={renderDatePicker}
                    />
                    <Field
                        name='typeEvent'
                        component={renderPickerEventType}
                    />      
                    <TouchableOpacity
                        onPress={handleSubmit}
                    >
                        <Text>Crear Evento</Text>
                    </TouchableOpacity>         
                </Content>
            </Container>
        </ImageBackground>
    )
}

export default connect(
    (state) => ({
    }),
)(
    reduxForm({
        form: 'new',
        onSubmit({ title, description, eventDate, typeEvent}, dispatch) {
            if (eventDate){
                const year = eventDate.getFullYear();
                const month = eventDate.getMonth()+1;
                const day = eventDate.getDate();
                const date = year+'-'+month+'-'+day;
                title && description && typeEvent && date && dispatch(
                    actions.startAddEvent({title, description, date, typeEvent}),
            );
            }
        }
    })(New)
);