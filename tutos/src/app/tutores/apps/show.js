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

import { theme } from './../../../layout/themes'

import * as selectors from '../../../tools/reducers'
import * as actions from '../../../tools/actions/tutorProfile'
import profileImg from '../../../assets/profile1.png'

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
                        <Row>
                            <Image style={style.img} source =  {profileImg}/>
                        </Row>
                        <Row>
                            <Text style={{ fontSize: 35 }}>{profile.first_name} {profile.last_name} </Text>
                            <Text style={{ fontSize: 15 }}>
                                {'\t' + tutorProfile.score}
                            </Text>
                            <FontAwesomeIcon style={theme.headerIcon} icon='star' size={25} />
                        </Row>
                        <Row>
                            <Text style={{ fontSize: 15 }}>
                                {'\t'+ profile.username}
                            </Text>
                        </Row>
                        <Row>
                            <Text style={{ fontSize: 20 }}>En tutos desde { dayjs(profile.date_joined).format('DD/MM/YYYY') }</Text>
                        </Row>
                    </Grid>
                    <Content>
                        <Text style={{ fontSize: 15 }}>
                             {'\t'+ `Descripcion:${tutorProfile.description}`}
                        </Text>
                    </Content>
                    <Content>
                        <ListItem>
                            <FontAwesomeIcon style={theme.headerIcon} icon='envelope' size={25} />
                            <Text style={{ fontSize: 15 }}>
                                {'\t' + profile.email}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <FontAwesomeIcon style={theme.headerIcon} icon='clock' size={25} />
                            <Text style={{ fontSize: 15 }}>
                                {'\t' + `Horas realizadas: ${tutorProfile.hours_done}` }
                            </Text>
                        </ListItem>
                        <ListItem>
                            <FontAwesomeIcon style={theme.headerIcon} icon='graduation-cap' size={25} />
                            <Text style={{ fontSize: 15 }}>
                                {'\t' + profile && profile.institution && profile.institution.name}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text style= {{fontSize: 15}}>Precios:</Text>
                        </ListItem>
                        <ListItem>
                            <Col>
                                <Row>
                                    <FontAwesomeIcon style={theme.headerIcon} icon='user' size={25} />
                                </Row>
                                <Row>
                                    <Text style={{ fontSize: 15 }}>
                                        {'\t' + tutorProfile.individual_price}
                                    </Text>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <FontAwesomeIcon style={theme.headerIcon} icon='users' size={25} />
                                </Row>
                                <Row>
                                    <Text style={{ fontSize: 15 }}>
                                        {'\t' + tutorProfile.grupal_price}
                                    </Text>
                                </Row>
                            </Col>                            
                        </ListItem>
                    </Content>
                </View>
            </Content>
        </Container>
    </ImageBackground>)
}

export default connect(
    (state, {route}) => ({
        profile : selectors.getProfile(state) ,
        tutorProfile : selectors.getTutorProfile(state)
    }),
    dispatch => ({
        getTutorProfile(){
            dispatch(actions.startGetTutorProfile())
        }
    })
)(Profile)