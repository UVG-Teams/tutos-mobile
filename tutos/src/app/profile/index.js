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
import { Col, Row, Grid } from 'react-native-easy-grid'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import dayjs from 'dayjs'

import { theme } from './../../layout/themes'

import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/tutorProfile'
import * as actionsP from '../../tools/actions/profile'
import profileImg from '../../assets/profile1.png'

import EditProfile from './editProfile'
import { getProfile } from '../../tools/reducers/profile'
const style = StyleSheet.create({
    img:{
        width: 150,
        height: 150,
    },
    button:{
        color: 'red',
        backgroundColor: '#d1dfed'
    }
})


const Profile = ({ navigation , profile , isFetchingProfile , tutorProfile , getTutorProfile , isFetchingTutorProfile , updateProfile } ) => {
    const onLoad = () => {
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
                <Body></Body>
                <Right></Right>
            </Header>
            {!isUpdating ? (<Content style={ theme.content }>
                <View>
                    <Grid>
                        <Col>
                            <Image style={style.img} source =  {profileImg}/>
                        </Col>
                        <Col>
                            <Text style={{ fontSize: 35 }}>{profile.first_name} {profile.last_name} </Text>
                                <Text style={{ fontSize: 20 }}>En tutos desde { dayjs(profile.date_joined).format('DD/MM/YYYY') }</Text>
                        </Col>
                    </Grid>
                    <Text></Text>
                        {isFetchingTutorProfile  && <ActivityIndicator size="large" color="#0000ff" />}
                        {!isFetchingTutorProfile  ? (
                        <Content>
                            <Separator bordered>
                                <Text style={{ fontSize: 20 }}>Descripción</Text>
                            </Separator>
                            <ListItem>
                                <Text style={{ fontSize: 15 }}>
                                     {'\t'+ tutorProfile.description}
                                </Text>
                            </ListItem>
                        </Content>) : (<Text></Text>)}
                        {isFetchingProfile ? <ActivityIndicator size="large" color="#0000ff" /> :
                        <Content>
                            <Separator bordered>
                                <Text style={{ fontSize: 20 }}>Información personal</Text>
                            </Separator>
                            <ListItem>
                                <FontAwesomeIcon style={theme.headerIcon} icon='at' size={25} />
                                <Text style={{ fontSize: 15 }}>
                                     {'\t'+ profile.username}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <FontAwesomeIcon style={theme.headerIcon} icon='envelope' size={25} />
                                <Text style={{ fontSize: 15 }}>
                                    {'\t' + profile.email}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <FontAwesomeIcon style={theme.headerIcon} icon='location-arrow' size={25} />
                                <Text style={{ fontSize: 15 }}>
                                    {'\t' + profile && profile.location && profile.location.name}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <FontAwesomeIcon style={theme.headerIcon} icon='graduation-cap' size={25} />
                                <Text style={{ fontSize: 15 }}>
                                    {'\t' + profile && profile.institution && profile.institution.name}
                                </Text>
                            </ListItem>
                        </Content>
                        }
                    <Text></Text>
                        {isFetchingTutorProfile && <ActivityIndicator size="large" color="#0000ff" />}
                        {profile.is_tutor && !isFetchingTutorProfile ? (
                        <Content>
                            <Separator bordered>
                                <Text style={{ fontSize: 20 }}>Información de tutor</Text>
                            </Separator>
                            <ListItem>
                                <FontAwesomeIcon style={theme.headerIcon} icon='adjust' size={25} />
                                <Text style={{ fontSize: 15 }}>
                                    {'\t' + `Puntuación en promedio: ${tutorProfile.score}` }
                                </Text>
                            </ListItem>
                            <ListItem>
                                <FontAwesomeIcon style={theme.headerIcon} icon='adjust' size={25} />
                                <Text style={{ fontSize: 15 }}>
                                    {'\t' + `Horas realizadas: ${tutorProfile.hours_done}` }
                                </Text>
                            </ListItem>
                            <ListItem>
                                <FontAwesomeIcon style={theme.headerIcon} icon='adjust' size={25} />
                                <Text style={{ fontSize: 15 }}>
                                    {'\t' + `Precio individual: ${tutorProfile.individual_price}` }
                                </Text>
                            </ListItem>
                            <ListItem>
                                <FontAwesomeIcon style={theme.headerIcon} icon='adjust' size={25} />
                                <Text style={{ fontSize: 15 }}>
                                    {'\t' + `Precio por grupo: ${tutorProfile.grupal_price}` }
                                </Text>
                            </ListItem>
                        </Content>
                    ) : (
                        <Text> </Text>
                        )}
                        <Text> </Text>
                        <Text> </Text>
                    <Button block  info 
                        onPress = {() => setisUpdating(true)}
                    >
                        <Text>Editar mi perfil</Text>
                    </Button>
                    <Text> </Text>
                    <Text> </Text>

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
        profile : selectors.getProfile(state) ,
        tutorProfile : selectors.getTutorProfile(state),
        isFetchingProfile : selectors.isFetchingProfile(state),
        isFetchingTutorProfile : selectors.isFetchingTutorProfile(state)
    }),
    dispatch => ({
        getTutorProfile(){
            dispatch(actions.startGetTutorProfile())
        },
        updateProfile(){
            dispatch(actionsP.startEditProfile())
        },
    })
)(Profile)
