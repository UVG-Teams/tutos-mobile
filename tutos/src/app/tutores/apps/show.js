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
import * as actions from '../../../tools/actions/users'
import * as tutoresactions from '../../../tools/actions/tutores'


const TutorProfile = ({ navigation , tutor, user, onLoad }) => {
    useEffect(onLoad , [])
    return(
    <ImageBackground
        style={ theme.background }
    >
        <Container style={{ backgroundColor: 'transparent' }}>
            <Header style={ theme.header }>
                <Left style={{ width: '20%'}}>
                    <Button transparent
                        onPress={ () => navigation.openDrawer() }
                    >
                        <FontAwesomeIcon style={ theme.headerIcon } icon='bars' size={ 25 }/>
                    </Button>
                </Left>
                <Body>
                    <Text style={{ fontSize: 25}}>
                    {user.username}
                    </Text>
                </Body>
                <Right></Right>
            </Header>
            <Content>
                <Grid style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                    
                    <Col style={{ flex: 0.5, alignSelf: 'center', width: '35%' }}>
                        {/* <Image style={ style.img } source =  { profileImg }/> */}
                        <FontAwesomeIcon icon='user-circle' size={ 110 } style={{ ...theme.sidebarIcon, margin: 10 }} />

                        <Row style = {{paddingLeft: 25}}>
                            <FontAwesomeIcon style={ theme.CardItem} icon='star' size={ 20 }/>
                            <Text style={{ fontSize: 18 }}>
                                {" "}
                                {tutor.score}
                            </Text>
                        </Row>
                    </Col>

                    <Col>
                        <Row>

                            <Text style={{ flex: 1, alignSelf: 'center', fontSize: 16 }}>
                                <FontAwesomeIcon style={ theme.headerIcon } icon='user' size={ 25 }/>
                                {" "}Q{tutor.individual_price}<Text style={{ fontSize: 14 }}>/hora</Text>
                            </Text>

                            
                            <Text style={{ flex: 1, alignSelf: 'center', fontSize: 16 }}>
                                <FontAwesomeIcon style={ theme.headerIcon } icon='users' size={ 30 }/>
                                {" "}Q{tutor.grupal_price} <Text style={{ fontSize: 14 }}>/hora</Text>
                            </Text>
                        </Row>

                        <Row style={{ marginTop: 8 }}>
                            <Text style={{ fontSize: 15}}>
                                {/* {tutor.description} */}
                                Ea anim amet sunt qui nostrud laboris laboris eiusmod minim do commodo mollit. Laborum duis magna minim est veniam cupidatat culpa in nulla anim.

                            </Text>
                        </Row>
                    </Col>
                </Grid>

                <Content style={ theme.content }>
                    <Grid>
                        <ListItem >
                            <FontAwesomeIcon style={ theme.headerIcon } icon='envelope' size={ 25 }/>
                            <Text style={{ fontSize: 15 , marginLeft: 8 }}>Correo</Text>

                            <Text style={{ fontSize: 15 , marginLeft: 8, textAlign: 'right' }}>
                                {user.email}
                            </Text>
                        </ListItem>
                    </Grid>
                </Content>
            </Content>
            <Content style={ theme.content }>
                <View>
                    <Grid>

                        {/* <Row>
                            <Text style={{ fontSize: 35, textAlign: "center", flex: 1 }}>{user.first_name}</Text>
                        </Row>
                        <Row>
                            <Text style={{ fontSize: 35, textAlign: "center", flex: 1 }}>{user.last_name}</Text>
                        </Row> */}
                        <Row>
                            <Text style={{ fontSize: 20, textAlign: "center", flex: 1, marginBottom: 15 }}>En tutos desde { dayjs(user.date_joined).format('DD/MM/YYYY') }</Text>
                        </Row>
                    </Grid>

                    <Content>

                        <ListItem>
                            <FontAwesomeIcon style={ theme.headerIcon } icon='clock' size={ 25 }/>
                            <Text style={{ fontSize: 15, marginLeft: 8 }}>
                                {`Horas realizadas: ${tutor.hours_done}` }
                            </Text>
                        </ListItem>
                        <ListItem>
                            <FontAwesomeIcon style={ theme.headerIcon } icon='graduation-cap' size={ 25 }/>
                            <Text style={{ fontSize: 15, marginLeft: 8 }}>
                                {user && user.institution && user.institution}
                            </Text>
                        </ListItem>
                    </Content>
                    <Card>
                        <CardItem button onPress={() => navigation.navigate('conversations', { tutor_id: tutor.id })}>
                            <Text>
                                Solicitar Tutoria
                            </Text>
                        </CardItem>
                    </Card>
                </View>
            </Content>
        </Container>
    </ImageBackground>
    )
}

export default connect(
    (state, { route }) => ({
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
