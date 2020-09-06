import React, { useEffect } from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ImageBackground,
    Image,
    StyleSheet
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
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import dayjs from 'dayjs'

import { theme } from './../../layout/themes'

import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/tutorProfile'
import profileImg from '../../assets/profile1.png'

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


const Profile = ({ navigation , profile , tutorProfile , getTutorProfile} ) => {
    const onLoad = () => {
        if (profile.is_tutor){
            getTutorProfile()
        }
    }
    useEffect(onLoad , [])
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
            <Content style={ theme.content }>
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
                        {profile.is_tutor ? 
                        (<Content>
                            <Separator bordered>
                                <Text style={{ fontSize: 20 }}>Descripción</Text>
                            </Separator>
                            <ListItem>
                                <Text style={{ fontSize: 15 }}>
                                     {'\t'+ tutorProfile.description}
                                </Text>
                            </ListItem>
                        </Content>) : (<Text></Text>)}
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
                    <Text></Text>
                    { profile.is_tutor && tutorProfile ? (
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
                        onPress = {() => alert('Pendiente')}
                    >
                        <Text>Editar mi perfil</Text>
                    </Button>
                    <Text> </Text>
                    <Text> </Text>

                </View>
            </Content>
        </Container>
    </ImageBackground>)
}

export default connect(
    state => ({
        profile : selectors.getProfile(state) ,
        tutorProfile : selectors.getTutorProfile(state)
    }),
    dispatch => ({
        getTutorProfile(){
            dispatch(actions.startGetTutorProfile())
        }
    })
)(Profile)
