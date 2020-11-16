import React, { useState } from 'react'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import {
	Text,
	ScrollView,
	Image,
	StyleSheet
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
	Icon,
	Separator,
} from 'native-base'

import { CheckBox } from 'react-native-elements'
import { find } from 'lodash'

const EditProfile = ({
	profile,
	tutorProfile={},
	updateProfile,
	updateTutorProfile,
	end,
	languages,
	careers,
	locations,
	institutions,
}) => {
	locations = locations.filter(loc => loc.location_type === 'municipality').map(value => ({
		id : value.id,
		name : value.name
	}))
	const [image, setImage] = useState(null);
	const [correo, setCorreo] = useState(profile.email)
	const [precioIndividual, setPrecioIndividual] = useState(tutorProfile.individual_price)
	const [precioGrupal, setPrecioGrupal] = useState(tutorProfile.grupal_price)
	const [descripcion, setDescripcion] = useState(tutorProfile.description)

	// userdetail
	const [phone, setPhone] = useState(profile.phone.toString())
	const [isTutor, setIsTutor] = useState(profile.is_tutor) 
	const [password0, setPassword0] = useState('')
	const [password1, setPassword1] = useState('')
	const [language, setLanguage] = useState({
		id: profile.language.id,
		name: profile.language.name,
	})
	const [career, setCareer] = useState({
		id: profile.career.id,
		name: profile.career.name
	})
	const [location, setLocation] = useState({
		id: profile.location.id,
		name: profile.location.name,
	})
	
	const [institution, setInstitution] = useState({
		id: profile.institution.id,
		name: profile.institution.name
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
	//   alert('Componentes actualizados')
	// }
	
	// useEffect(() => onLoad() , [])
	
	const onSubmit = () => {
		updateProfile({
			'email': correo,
			'phone': phone,
			'is_tutor' : isTutor,
			'language': language && language.id,
			'location': location && location.id,
			'institution': institution && institution.id,
			'career': career && career.id,
			'password': password0===password1 ? password0 : '',
			'image': image
		})
		if (profile.is_tutor){
			updateTutorProfile({
				'description': descripcion,
				'individual_price': precioIndividual,
				'grupal_price': precioGrupal
			})
		}
		end(false)
	}

	return(
		<ScrollView>
			{
				image && (
					<Image
						style={{ height: 150, width: 150 }}
						source={{
							uri: image.uri
						}}
					/>
				)
			}
			<Button block info
				onPress={() => ImagePicker.launchImageLibrary(
					{
						mediaType: 'photo',
					},
					response => {
						setImage(response)
					},
				)}
			>
				<Text>Elige una foto</Text>
			</Button>
			<Form>
				{/* <Text style={{ fontSize: 35 }}> Editar Perfil  </Text> */}
				<Separator>
					<Text style={{ fontSize: 25 }}>
						Información general
					</Text>
				</Separator>
				<Item style={style.item}>
					<Label style={style.label}>Correo</Label>
					<Input
						style={style.input}
						value={correo}
						onChangeText={text => setCorreo(text)}
					/>
				</Item>
				<Item style={style.item}>
					<Label style={style.label}>No. de teléfono</Label>
					<Input
						style={style.input}
						value={ phone}
						onChangeText={text => setPhone(text)}
						keyboardType='numeric'
					/>
				</Item>
				<Item>
					<Label style={style.label}>Es tutor: </Label>
					{/* <CheckBox
						disabled={false}
						value={isTutor}
						onChangeValue={(newValue) => setIsTutor(newValue)}
					/> */}
					<CheckBox
						checked={isTutor}
						onPress={() => setIsTutor(!isTutor)}
					/>
				</Item>
				{profile.is_tutor ? (
					<>
						<Separator>
							<Text style={{ fontSize: 25 }}>
								Información de Tutor
							</Text>
						</Separator>
						<Item style={style.item}>
							<Label style={style.label}>Descripción</Label>
							<Input
								style={style.input}
								value={descripcion}
								onChangeText={text => setDescripcion(text)}
							/>
						</Item>
						<Item style={style.item}>
							<Label style={style.label}>Precio Individual</Label>
							<Input
								style={style.input}
								value={precioIndividual}
								onChangeText={text => setPrecioIndividual(text)}
							/>
						</Item>
						<Item style={style.item}>
							<Label style={style.label}>Precio Grupal</Label>
							<Input
								style={style.input}
								value={precioGrupal}
								onChangeText={text => setPrecioGrupal(text)}
							/>
						</Item>
					</>
				) : (<Text></Text>)}
				<Separator>
					<Text style={{ fontSize: 25 }}>
						Información Personal
					</Text>
				</Separator>
				<Item style={style.item}>
					<Label style={style.label}>Nueva contraseña</Label>
					<Input
						style={style.input}
						value={password0}
						placeholder="Dejar el campo en blanco para conservar la contraseña actual"
						onChangeText={text => setPassword0(text)}
					/>
				</Item>
				<Item style={style.item}>
					<Label style={style.label}>Confirmar Contraseña</Label>
					<Input
						style={style.input}
						value={password1}
						placeholder="Dejar el campo en blanco para conservar la contraseña actual"
						onChangeText={text => setPassword1(text)}
					/>
				</Item>
				<Item style={style.itemPicker}>
					<Label style={style.label}>Cambiar tu idioma</Label>
					<Picker
						style={style.picker}
						mode="dropdown"
						iosIcon={<Icon name="arrow-down" />}
						placeholder="Selecciona tu idioma"
						placeholderStyle={{ ccolor: "gray", fontSize: 15, width:'100%' }}
						placeholderIconColor="gray"
						selectedValue={language}
						onValueChange={value => setLanguage(value)}
					>
						{
							languages.map(
								element => (
									<Picker.Item
										key={element.id}
										label={element.name}
										value={element.id}
									/>
								)
							)
						}
					</Picker>
				</Item>
				<Item style={style.itemPicker}>
					<Label style={style.label}>Cambiar tu Institucion</Label>
					<Picker
						style={style.picker}
						mode="dropdown"
						iosIcon={<Icon name="arrow-down" />}
						placeholder="Selecciona tu Ubicación"
						placeholderStyle={{ color: "gray", fontSize: 15, width:'100%' }}
						placeholderIconColor="#007aff"
						selectedValue={institution}
						onValueChange={value => setInstitution(value)}
					>
						{
							institutions.map(
								element => (
									<Picker.Item
										key={element.id}
										label={element.name}
										value={element.id}
									/>
								)
							)
						}
					</Picker>
				</Item>
				<Item style={style.itemPicker}>
					<Label style={style.label}>Cambiar tu Carrera</Label>
					<Picker
						style={style.picker}
						mode="dropdown"
						iosIcon={<Icon name="arrow-down" />}
						placeholder="Selecciona tu Ubicación"
						placeholderStyle={{ color: "gray", fontSize: 15, width:'100%' }}
						placeholderIconColor="#007aff"
						selectedValue={career}
						onValueChange={value => setCareer(value)}
					>
						{
							careers.map(
								element => (
									<Picker.Item
										key={element.id}
										label={element.name}
										value={element.id}
									/>
								)
							)
						}
					</Picker>
				</Item>
				<Item style={style.itemPicker}>
					<Label style={style.label}>Cambiar tu Ubicacion</Label>
					<Picker
						style={style.picker}
						mode="dropdown"
						iosIcon={<Icon name="arrow-down" />}
						placeholder="Selecciona tu Ubicación"
						placeholderStyle={{ color: "gray", fontSize: 15, width:'100%' }}
						placeholderIconColor="#007aff"
						selectedValue={location}
						onValueChange={value => setLocation(value)}
					>
						{
							locations.map(
								element => (
									<Picker.Item
										key={element.id}
										label={element.name}
										value={element.id}
									/>
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
		locations: selectors.getLocations(state),
		institutions: selectors.getInstitutions(state)
	}),
	dispatch=>({
		updateProfile(data){
			dispatch(actions.startEditProfile(data))
		},
		updateTutorProfile(data){
			dispatch(actionsTutor.startEditTutorProfile(data))
		},
	})
)(EditProfile)


const style = StyleSheet.create({
    label:{
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
		// width: '100%'
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
		// width: '77%',
	}
})
