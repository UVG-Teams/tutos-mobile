import React, { useState , useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  ScrollView
} from 'react-native'

import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/profile'
import * as actionsTutor from '../../tools/actions/tutorProfile'

import {
  Button,
  Form, 
  Item,
  Input,
  Label,
  Picker,
  Icon
} from 'native-base'

import CheckBox from '@react-native-community/checkbox';
import { find } from 'lodash'

const EditProfile = ({ 
    profile , 
    tutorProfile={} , 
    updateProfile , 
    updateTutorProfile , 
    end , 
    languages, 
    careers ,
    locations,
    institutions
  }) => {
  locations = locations.filter(loc => loc.location_type === 'municipality').map(value => ({
    id : value.id,
    name : value.name
  }))
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
  const [career, setCareer] = useState({
    id: profile.career.id,
    name : profile.career.name
  })
  const [location, setLocation] = useState({
    id : profile.location.id,
    name : profile.location.name,
  })

  const [institution, setInstitution] = useState({
    id: profile.institution.id,
    name : profile.institution.name
  })

  // const onLoad = () => {
  //   setLanguage({
  //     id: profile.language,
  //     name: find(languages, element => element.id === profile.language),
  //   })
  //   setCareer({
  //     id: profile.career.id,
  //     name: profile.career.name
  //   })
  //   setLocation({
  //     id: profile.location.id,
  //     name: profile.location.name,
  //   })
  //   setInstitution({
  //     id: profile.institution.id,
  //     name: profile.institution.name
  //   })
  //   console.log('Componentes actualizados')
  // }
  
  // useEffect(() => onLoad() , [])

  const onSubmit = () => {
    updateProfile({
      'email': correo,
      'phone': phone,
      'is_tutor' : isTutor,
      'language': language.id ? language.id : language,
      'location': location.id ? location.id : location,
      'institution': institution.id ? institution.id : institution,
      'career': career.id ? career.id : career,
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
    <ScrollView>
    <Form>
      <Text style={{ fontSize: 35 }}> Editar Perfil  </Text>
        <Text style={{ fontSize: 25 }}>
          Información general
        </Text>
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
      <Item>
        <Label>Es tutor: </Label>
        <CheckBox
          disabled={false}
          value={isTutor}
          onValueChange={(newValue) => setIsTutor(newValue)}
        />
      </Item>
      {profile.is_tutor ? (
        <>
        <Text style={{ fontSize: 25 }}>
          Información de Tutor
        </Text>
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
        <Text style={{ fontSize: 25 }}>
        Información Personal
      </Text>
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
              (element) => (
                <Picker.Item 
                  label={element.name} 
                  value={element.id} 
                />
              )
            )
          }
        </Picker>
      </Item>
      <Item>
        <Label>Cambiar tu Institucion</Label>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Selecciona tu Ubicación"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          style={{ width: undefined }}
          selectedValue={institution}
          onValueChange={value => setInstitution(value)}
        >
          {
            institutions.map(
              (element) => (
                <Picker.Item 
                  label={element.name} 
                  value={element.id} 
                />
              )
            )
          }
        </Picker>
      </Item>
      <Item>
        <Label>Cambiar tu Carrera</Label>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Selecciona tu Ubicación"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          style={{ width: undefined }}
          selectedValue={career}
          onValueChange={value => setCareer(value)}
        >
          {
            careers.map(
              (element) => (
                <Picker.Item 
                  label={element.name} 
                  value={element.id} 
                />
              )
            )
          }
        </Picker>
      </Item>
      <Item>
        <Label>Cambiar tu Ubicacion</Label>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Selecciona tu Ubicación"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={location}
          onValueChange={value => setLocation(value)}
        >
          {
            locations.map(
              (element) => (
                <Picker.Item 
                  label={element.name} 
                  value={element.id} />
              )
            )
          }
        </Picker>
      </Item>
      <Text> </Text>
      <Button block info
        onPress={() => onSubmit()}
      >
        <Text>Guardar Cambios</Text>
      </Button>
    </Form>
    </ScrollView>
  )
}

export default connect(
  state=>({
    profile: selectors.getProfile(state),
    tutorProfile: selectors.getTutorProfile(state),
    languages: selectors.getLanguages(state),
    careers: selectors.getCareers(state),
    locations : selectors.getLocations(state),
    institutions: selectors.getInstitutions(state)
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
