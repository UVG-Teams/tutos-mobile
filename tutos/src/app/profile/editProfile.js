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
  Label 
} from 'native-base'


const EditProfile = ({ profile , tutorProfile={} , updateProfile , updateTutorProfile , end}) => {
  const [nombres, setNombres] = useState(profile.first_name)
  const [apellidos, setApellidos] = useState(profile.last_name)
  const [usuario, setUsuario] = useState(profile.username)
  const [correo, setCorreo] = useState(profile.email)
  const [precioIndividual, setPrecioIndividual] = useState(tutorProfile.individual_price)
  const [precioGrupal, setPrecioGrupal] = useState(tutorProfile.grupal_price)
  const [descripcion , setDescripcion] = useState(tutorProfile.description)
  const onSubmit = () => {
    updateProfile({
      'first_name': nombres,
      'last_name': apellidos,
      'username': usuario,
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
      <Text style={{ fontSize: 35 }}> Editar Perfil </Text>
      <Item floatingLabel>
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
      </Item>
      <Item floatingLabel>
        <Label>Usuario</Label>
        <Input
          value={usuario}
          onChangeText={text => setUsuario(text)}
        />
      </Item>
      <Item floatingLabel>
        <Label>Correo</Label>
        <Input
          value={correo}
          onChangeText={text => setCorreo(text)}
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
        </>
      ): (<Text></Text>)}
      <Text> </Text>
      <Button block info
        onPress={() => onSubmit({nombres, apellidos, usuario, correo })}
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
  }),
  dispatch=>({
    updateProfile(data){
      dispatch(actions.startEditProfile(data))
    },
    updateTutorProfile(data){
      dispatch(actionsTutor.startEditTutorProfile(data))
    }
  })
)(EditProfile)
