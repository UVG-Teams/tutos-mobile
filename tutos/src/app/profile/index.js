import React, { useEffect , useState } from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ImageBackground,
    Image,
    StyleSheet,
    ActivityIndicator
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
} from 'native-base'
import { connect, createStoreHook } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import dayjs from 'dayjs'

import { theme } from './../../layout/themes'

import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/tutorProfile'
import * as actionsP from '../../tools/actions/profile'
import * as actionsL from '../../tools/actions/languages'
import * as actionsLocations from '../../tools/actions/location'
import * as actionsIns from '../../tools/actions/institution'
import * as actionsCareers from '../../tools/actions/careers'
import profileImg from '../../assets/profile1.png'

import EditProfile from './editProfile'
import { getProfile } from '../../tools/reducers/profile'


const Profile = ({
        navigation,
        profile,
        isFetchingProfile,
        tutorProfile,
        getTutorProfile,
        isFetchingTutorProfile,
        updateProfile,
        getLanguage ,
        getLocations,
        getInstitutions,
        getCareers,
}) => {
    const onLoad = () => {
        getLanguage()
        getLocations()
        getInstitutions()
        getCareers()
        if (profile.is_tutor){
            getTutorProfile()
        }
    }
    useEffect(onLoad , [])
    const [isUpdating, setisUpdating] = useState(false)
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
                    <Body>
                        <Text style={{ fontSize: 25}}>
                            Perfil
                        </Text>
                    </Body>
                    <Right></Right>
                </Header>
                {!isUpdating ? (<Content>
                    <View>
                        <Grid style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                            <Row style={{ flex: 0.5, alignSelf: 'center', width: '35%' }}>
                                <Col>
                                    {/* <Image style={style.img} source =  {profileImg}/> */}
                                    <FontAwesomeIcon icon='user-circle' size={ 130 } style={{ ...theme.sidebarIcon, margin: 10 }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Text  style={{ flex: 1, alignSelf: 'center', fontSize: 35 }}>{profile.first_name} {profile.last_name} </Text>
                                    <Text  style={{ flex: 1, alignSelf: 'center', fontSize: 20 }}>En tutos desde { dayjs(profile.date_joined).format('DD/MM/YYYY') }</Text>
                                    {isFetchingTutorProfile  && <ActivityIndicator size="large" color="#0000ff" />}
                                    {!isFetchingTutorProfile  ? (
                                    <Content style = {{ width: '100%'}}>
                                        {
                                            profile.is_tutor ? (
                                                <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 15, paddingLeft: 15, paddingRight: 15 }}>
                                                    {tutorProfile.description}
                                                </Text>
                                            ) : (
                                                <></>
                                            )
                                        }
                                    </Content>) : (<Text></Text>)}
                                </Col>
                            </Row>
                        </Grid>
                            {isFetchingProfile ? <ActivityIndicator size="large" color="#0000ff" /> :
                            <Content>
                                <List>
                                    {/* User */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon icon='at' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Usuario
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15 }}>
                                            {profile.username}
                                        </Text>
                                    </ListItem>

                                    {/* Email */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon icon='envelope' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Correo
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15 }}>
                                            {profile.email}
                                        </Text>
                                    </ListItem>

                                    {/* Phone */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon icon='phone' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Teléfono
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15 }}>
                                            {profile.phone}
                                        </Text>
                                    </ListItem>

                                    {/* Location */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon icon='location-arrow' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Ubicación
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15 }}>
                                            {'\t' + profile && profile.location && profile.location.name}
                                        </Text>
                                    </ListItem>

                                    {/* University */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon style={{ flex: 1, alignSelf: 'center'}} icon='university' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Centro educativo
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15 }}>
                                            {profile && profile.institution && profile.institution.name}
                                        </Text>
                                    </ListItem>

                                    {/* Degree */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon style={theme.headerIcon} icon='graduation-cap' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Carrera educativa
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15,  marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                            {profile && profile.career && profile.career.name}
                                        </Text>
                                    </ListItem>
                                </List>
                            </Content>
                            }
                        <Text></Text>
                            {isFetchingTutorProfile && <ActivityIndicator size="large" color="#0000ff" />}
                            {profile.is_tutor && !isFetchingTutorProfile ? (
                            <Content>
                                <Separator>
                                    <Text style={{ fontSize: 20 }}>Información de tutor</Text>
                                </Separator>
                                <List>
                                    {/* Average score */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon style={theme.headerIcon} icon='star' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Puntuación promedio
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15 }}>
                                            {`${tutorProfile.score}` }
                                        </Text>
                                    </ListItem>
                                    
                                    {/* Total hours */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon style={theme.headerIcon} icon='clock' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Horas realizadas
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15 }}>
                                            {`${tutorProfile.hours_done}` }
                                        </Text>
                                    </ListItem>

                                    {/* Individual price */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon style={theme.headerIcon} icon='user' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Precio individual
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15 }}>
                                            {`${tutorProfile.individual_price}` }
                                        </Text>
                                    </ListItem>

                                    {/* Group price */}
                                    <ListItem>
                                        <View style={{flex:1, flexDirection: 'row'}}>
                                            <FontAwesomeIcon style={theme.headerIcon} icon='users' size={25} />
                                            <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                                Precio por grupo
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 15 }}>
                                            {`${tutorProfile.grupal_price}` }
                                        </Text>
                                    </ListItem>
                                </List>
                            </Content>
                        ) : (
                            <Text> </Text>
                            )}

                        {/* <Button block  info
                            onPress = {() => setisUpdating(true)}
                        >
                            <Text>Editar mi perfil</Text>
                        </Button> */}
                        <TouchableOpacity
                            style={ style.buttonEditProfile }
                            onPress={ () => setisUpdating(true)}
                            >
                            <Text style={ style.txtButtonEditProfile}> Editar mi perfil </Text>
                        </TouchableOpacity>
                    </View>
                </Content>
                ) : (
                    <EditProfile
                        end={setisUpdating}
                    />
                )}
            </Container>
        </ImageBackground>)


}

export default connect(
    state => ({
        profile: selectors.getProfile(state) ,
        tutorProfile: selectors.getTutorProfile(state),
        isFetchingProfile: selectors.isFetchingProfile(state),
        isFetchingTutorProfile: selectors.isFetchingTutorProfile(state)
    }),
    dispatch => ({
        getTutorProfile(){
            dispatch(actions.startGetTutorProfile())
        },
        updateProfile(){
            dispatch(actionsP.startEditProfile())
        },
        getLanguage(){
            dispatch(actionsL.startFetchLanguage())
        },
        getLocations() {
            dispatch(actionsLocations.startFetchLocations())
        },
        getInstitutions() {
            dispatch(actionsIns.startFetchInstitutions())
        },
        getCareers(){
            dispatch(actionsCareers.startFetchCareers())
        }
    })
)(Profile)

const style = StyleSheet.create({
    img:{
        width: 150,
        height: 150,
    },
    buttonEditProfile: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#146dc7',
        paddingTop: 10,
        paddingBottom: 10,
    },
    txtButtonEditProfile: {
        // width: '100%',
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
})
