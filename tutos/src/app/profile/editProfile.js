import React, { useState } from 'react'
import { connect, createStoreHook } from 'react-redux'
import {
  Text
} from 'react-native'

import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/profile'
import * as actionsTutor from '../../tools/actions/tutorProfile'

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
  Form, 
  Item,
  Input,
  Label,
  Picker,
  Icon
} from 'native-base'

import CheckBox from '@react-native-community/checkbox';
import { find } from 'lodash'

const EditProfile = ({ profile , tutorProfile={} , updateProfile , updateTutorProfile , end , languages}) => {
  const [nombres, setNombres] = useState(profile.first_name)
  const [apellidos, setApellidos] = useState(profile.last_name)
  const [correo, setCorreo] = useState(profile.email)
  const [precioIndividual, setPrecioIndividual] = useState(tutorProfile.individual_price)
  const [precioGrupal, setPrecioGrupal] = useState(tutorProfile.grupal_price)
  const [descripcion , setDescripcion] = useState(tutorProfile.description)
  
  // userdetail
  const [phone, setPhone] = useState(profile.phone.toString())
  const [isTutor , setIsTutor] = useState(profile.is_tutor) 
  const [password0 , setPassword0 ] = useState('')
  const [password1 , setPassword1 ] = useState('')
  const [language , setLanguage] = useState({
    id: profile.language,
    name: find(languages , element => element.id === profile.language),
  })

  const onSubmit = () => {
    updateProfile({
      'first_name': nombres,
      'last_name': apellidos,
      'email': correo
    })
    if (profile.is_tutor){
      updateTutorProfile({
        'description': descripcion,
        'individual_price' : precioIndividual,
        'grupal_price' : precioGrupal
      })
    }
    end(false)
  }
  return(
    <Form>
      <Text style={{ fontSize: 35 }}> Editar Perfil  </Text>
      {/* <Item floatingLabel>
        <Label>Nombres</Label>
        <Input 
        value = {nombres}
        onChangeText={text =>setNombres(text)}
        />
      </Item>
      <Item floatingLabel>
        <Label>Apellidos</Label>
        <Input
          value={apellidos}
          onChangeText={text => setApellidos(text)}
        />
      </Item> */}
      <Item floatingLabel>
        <Label>Correo</Label>
        <Input
          value={correo}
          onChangeText={text => setCorreo(text)}
        />
      </Item>
      <Item floatingLabel>
        <Label>No. de teléfono</Label>
        <Input
          value={ phone}
          onChangeText={text => setPhone(text)}
          keyboardType='numeric'
        />
      </Item>
      {profile.is_tutor ? (
        <>
          <Item floatingLabel>
            <Label>Descripción</Label>
            <Input
              value={descripcion}
              onChangeText={text => setDescripcion(text)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Precio Individual</Label>
            <Input
              value={precioIndividual}
              onChangeText={text => setPrecioIndividual(text)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Precio Grupal</Label>
            <Input
              value={precioGrupal}
              onChangeText={text => setPrecioGrupal(text)}
            />
          </Item>
          <Item>
            <Label>Es tutor: </Label>
            <CheckBox
              disabled={false}
              value={isTutor}
              onValueChange={(newValue) => setIsTutor(newValue)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Nueva contraseña</Label>
            <Input
              value={password0}
              placeholder="Dejar el campo en blanco para conservar la contraseña actual"
              onChangeText={text => setPassword0(text)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Confirmar Contraseña</Label>
            <Input
              value={password1}
              placeholder="Dejar el campo en blanco para conservar la contraseña actual"
              onChangeText={text => setPassword1(text)}
            />
          </Item>
          <Item>
            <Label>Cambiar tu idioma</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Selecciona tu idioma"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={language}
              onValueChange={value => setLanguage(value)}
            >
              {
                languages.map(
                  (element) => (<Picker.Item label={element.name} value={element.id} />)
                )
              }
            </Picker>
          </Item>
        </>
      ): (<Text></Text>)}
      <Text> </Text>
      <Button block info
        onPress={() => onSubmit({nombres, apellidos, correo })}
      >
        <Text>Guardar Cambios</Text>
      </Button>
    </Form>
  )
}

export default connect(
  state=>({
    profile: selectors.getProfile(state),
    tutorProfile: selectors.getTutorProfile(state),
    languages: selectors.getLanguages(state),
  }),
  dispatch=>({
    updateProfile(data){
      dispatch(actions.startEditProfile(data))
    },
    updateTutorProfile(data){
      dispatch(actionsTutor.startEditTutorProfile(data))
    },
    updateUserDetail(data){
      // Despachar accion de editar userdetail
    }
  })
)(EditProfile)
