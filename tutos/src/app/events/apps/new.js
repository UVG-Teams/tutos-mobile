import React, { useEffect } from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ImageBackground,
    Image,
    StyleSheet,
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
    Title,
    Card,
    CardItem,
    Separator,
    List, 
    ListItem,
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
        placeHolderText='Seleccionar fecha'
        placeHolderTextStyle={{color:'lightgray', borderRadius: 5, backgroundColor: 'white'}}
        textStyle={{color:'black', borderRadius: 5, backgroundColor: 'white'}}
        disabled={false}
        onDateChange={onChange}
        value={value}
        // formatChosenDate={value => {return moment(value).format('YYYY-MM-DD');}}
    />
)

const renderPickerEventType = ({input:{onChange, value, placeholder, ...restInput}}) => (
    <Picker
        style={{marginBottom:10, width:'100%', backgroundColor:'white'}}
        note
        placeholder='Tutoria'
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
                    <Body>
                        <Text style={{ fontSize: 25}}>
                            Crear evento
                        </Text>
                    </Body>
                    <Right></Right>
                </Header>
                <Content style={ theme.content }>
                    <Text style={styles.fieldText}>Título:</Text>
                    <Field
                        name='title'
                        placeholder='Titulo'
                        component={RenderInput}
                    />
                    <Text style={styles.fieldText}>Descripción:</Text>
                    <Field
                        name='description'
                        placeholder='Descripcion'
                        component={RenderInput}
                    />
                    <Text style={styles.fieldText}>Fecha de evento:</Text>
                    <Field
                        name='eventDate'
                        component={renderDatePicker}
                    />
                    <Text style={styles.fieldText}>Tipo de evento:</Text>
                    <Field
                        name='typeEvent'
                        component={renderPickerEventType}
                    />      
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.btnCreateEvent}
                    >
                        <Text style={styles.txtCreateEvent}>Crear Evento</Text>
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
            const year = eventDate.getFullYear();
            const month = eventDate.getMonth()+1;
            const day = eventDate.getDate();
            const date = year+'-'+month+'-'+day;
            dispatch(
                actions.startAddEvent({title, description, date, typeEvent}),
            );
        }
    })(New)
);


const styles = StyleSheet.create({
    fieldText: {
        marginBottom: 5,
        marginTop: 5,
        fontSize: 17
    },
    btnCreateEvent: {
        width: '100%',
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#146dc7',
        paddingLeft: '37%',
        paddingRight: '39%',
        paddingTop: 7,
        paddingBottom: 7,
    },
    txtCreateEvent: {
        color: 'white',
        fontSize: 19,
        width: '160%',
    }
})