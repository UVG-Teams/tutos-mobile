import React, {useState} from 'react'
import {
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import moment from 'moment'
import {
  Container,
  Content,
  Button,
  Header,
  Left,
  Body,
  Right,
  Form,
  Item,
  Label,
  Input,
  DatePicker,
  Picker,
} from 'native-base'

import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../../layout/themes'

import * as selectors from '../../../tools/reducers'
import * as actions from '../../../tools/actions/events'

const RenderDatePicker = ({onChange, value}) => {
  const [year, month, day] = value.split('-')
  return <DatePicker
    defaultDate={new Date(year, month-1, day)}
    minimumDate={new Date(1920, 1, 1)}
    maximumDate={new Date(2021, 1, 1)}
    locale={'en'}
    modalTransparent={false}
    animationType={'fade'}
    androidMode={'default'}
    textStyle={{ color: 'black' }}
    disabled={false}
    formatChosenDate={value => {return moment(value).format('YYYY-MM-DD')}}
    onDateChange={value => onChange(moment(value).format('YYYY-MM-DD') )}
    value={value}
  />
}


const RenderPickerEventType = ({onChange, value}) => (
  <Picker
    style={{ borderWidth: 1, borderStyle: "solid", width: 107, marginBottom: 10 }}
    note
    mode='dropdown'
    selectedValue={value}
    onValueChange={onChange}
  >
    <Picker.Item label='Tutoria' value='tutoria' />
    <Picker.Item label='Social' value='social' />
    <Picker.Item label='Personal' value='personal' />
    <Picker.Item label='Otros' value='other' />
  </Picker>
)

const Edit = ({ navigation, handleSubmit , event}) => {
  const [title, setTitle] = useState(event.title)
  const [description, setDescription] = useState(event.description)
  const [date, setDate] = useState(event.date)
  const [typeEvent, setTypeEvent] = useState(event.typeEvent)
  

  return (
    <ImageBackground
      style={theme.background}
    >
      <Container style={{ backgroundColor: 'transparent' }}>
        <Header style={theme.header}>
          <Left>
            <Button transparent
              onPress={() => navigation.openDrawer()}
            >
              <FontAwesomeIcon style={theme.headerIcon} icon='bars' size={25} />
            </Button>
          </Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <Content style={theme.content}>
          <Text style={{ flex: 1, alignSelf: 'center', fontSize: 35 }} >Editar Evento</Text>
          <Form>
            <Item style={style.item}>
              <Label style={style.label} >
                Título
              </Label>
              <Input
                style={style.input}
                value={title}
                onChangeText={text => setTitle(text)}
              />
            </Item>
            <Item style={style.item}>
              <Label style={style.label} >
                  Descripción
              </Label>
              <Input
                style={style.input}
                value={description}
                onChangeText={text => setDescription(text)}
              />
            </Item>
            <Item style={style.item}>
              <Label style={style.label} >
                Fecha
              </Label>
              <RenderDatePicker
                style={style.input}
                value={date}
                onChange={text => setDate(text)}
              />
            </Item>
            <Item style={style.item}>
              <Label style={style.label} >
                Tipo de evento
              </Label>
              <RenderPickerEventType
                style={style.input}
                value={typeEvent}
                onChange={text => setTypeEvent(text)}
              />
            </Item>
          </Form>
          <Button block info
            onPress={() => {
              handleSubmit(title, description, date, typeEvent , event.id)
              navigation.navigate('show', { id: event.id })
            }}
          >
            <Text>Crear Evento</Text>
          </Button>
        </Content>
      </Container>
    </ImageBackground>
  )
}

export default connect(
  (state, { route } ) => ({
    event: selectors.getEvent(state, route.params.id)
  }),
  (dispatch) => ({
    handleSubmit(title, description, eventDate, typeEvent, id){
        dispatch(actions.startEditEvent({
          title, 
          description, 
          date: eventDate, 
          typeEvent, 
          id }))
    },
  }),
)(
  Edit
);

const style = StyleSheet.create({
  label: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
    paddingLeft: 5,
    fontWeight: '500'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },
  itemPicker: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  input: {
    fontSize: 15,
    color: 'gray',
    height: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    width: '93%',
    alignSelf: 'flex-start'
  },
  picker: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  }
})
