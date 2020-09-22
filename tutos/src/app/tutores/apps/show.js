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
import profileImg from '../../../assets/profile1.png'
import { State } from 'react-native-gesture-handler'
import * as actions from '../../../tools/actions/users'
import * as tutoresactions from '../../../tools/actions/tutores'

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


const TutorProfile = ({ navigation , tutor, user, onLoad} ) => {
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
                        <Row style= {{justifyContent: "center"}}>
                            <Image style={style.img} source =  {profileImg}/>
                        </Row>
                        <Row>
                            <Text style={{ fontSize: 35, textAlign: "center", flex: 1}}>{user.first_name} </Text>
                        </Row>
                        <Row>
                            <Text style={{ fontSize: 35, textAlign: "center", flex: 1}}> {user.last_name} </Text>                            
                        </Row>
                        <Row>
                            <Text style={{ fontSize: 20, textAlign: "center", flex: 1, marginBottom: 15}}>En tutos desde { dayjs(user.date_joined).format('DD/MM/YYYY') }</Text>
                        </Row>
                        <Row>
                            <FontAwesomeIcon style={theme.headerIcon} icon='at' size={20} />
                            <Col>
                                <Text style={{ fontSize: 20 }}>
                                    {user.username}
                                </Text>
                            </Col>
                            <FontAwesomeIcon style={theme.headerIcon} icon='star' size={25} />
                            <Text style={{ fontSize: 20 }}>
                                {tutor.score}
                            </Text>
                        </Row>
                    </Grid>
                    <Content>
                        <Text style={{ fontSize: 15, marginTop: 15}}>
                             {`Descripcion: ${tutor.description}`}
                        </Text>
                    </Content>
                    <Content>
                        <ListItem>
                            <FontAwesomeIcon style={theme.headerIcon} icon='envelope' size={25} />
                            <Text style={{ fontSize: 15 , marginLeft: 8}}>
                                {user.email}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <FontAwesomeIcon style={theme.headerIcon} icon='clock' size={25} />
                            <Text style={{ fontSize: 15, marginLeft: 8}}>
                                {`Horas realizadas: ${tutor.hours_done}` }
                            </Text>
                        </ListItem>
                        <ListItem>
                            <FontAwesomeIcon style={theme.headerIcon} icon='graduation-cap' size={25} />
                            <Text style={{ fontSize: 15, marginLeft: 8}}>
                                {user && user.institution && user.institution}
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text style= {{fontSize: 15}}>Precios:</Text>
                        </ListItem>
                        <ListItem style= {{marginBottom: 20, marginTop: 10}}>
                            <Col>
                                <Row style= {{justifyContent: "center"}}>
                                    <FontAwesomeIcon style={theme.headerIcon} icon='user' size={25} />
                                </Row>
                                <Row>
                                    <Text style={{ fontSize: 15, textAlign: "center", flex: 1 }}>
                                        Q{tutor.individual_price}
                                    </Text>
                                </Row>
                            </Col>
                            <Col>
                                <Row style= {{justifyContent: "center"}}>
                                    <FontAwesomeIcon style={theme.headerIcon} icon='users' size={25} />
                                </Row>
                                <Row>
                                    <Text style={{ fontSize: 15 , textAlign: "center", flex: 1}}>
                                        Q{tutor.grupal_price}
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
        user: selectors.getUser(state, route.params.id),
        tutor: selectors.getTutor(state, route.params.id),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingUsers());
            dispatch(tutoresactions.startFetchingTutores());
        },
    })
)(TutorProfile)