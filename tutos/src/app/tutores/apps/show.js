import 'react-native-get-random-values'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ImageBackground,
    Image,
    StyleSheet,
    Dimensions,
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
import { TouchableOpacity } from 'react-native-gesture-handler'

import { theme } from './../../../layout/themes'
import Modal from 'react-native-modal';

import * as selectors from '../../../tools/reducers'
import profileImg from '../../../assets/profile1.png'
import * as actions from '../../../tools/actions/users'
import * as tutoriaActions from '../../../tools/actions/tutorias'
import * as tutoresactions from '../../../tools/actions/tutores'


const TutorProfile = ({ navigation , tutor, user, onLoad,authUserId, createTutoria }) => {
    useEffect(onLoad , [])
    const [course, changeCourse] = useState('')
    const [date, changeDate] = useState('')
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        console.log('cerrar')
    };
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;
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
                                {tutor.description}
                            </Text>
                        </Row>
                    </Col>
                </Grid>

                <Content style={ theme.content }>
                    <Grid>
                        <List style={{width: '100%'}}>
                            <ListItem>

                                <View style={{flex:1, flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={ theme.headerIcon } icon='envelope' size={ 25 }/>
                                    <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                        Correo
                                    </Text>
                                </View>

                                <Text style={{ fontSize: 15 , marginLeft: 8 }}>
                                    {user.email}
                                </Text>
                            </ListItem>

                            {/* Location */}
                            {/* <ListItem>
                            </ListItem> */}

                            <ListItem>
                                <View style={{flex:1, flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={ theme.headerIcon } icon='graduation-cap' size={ 25 }/>
                                    <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}>
                                        Institución
                                    </Text>
                                </View>

                                <Text style={{ fontSize: 15}}>
                                    {user && user.institution && user.institution.name}
                                </Text>
                            </ListItem>

                            <ListItem>
                                <View style={{flex:1, flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={ theme.headerIcon } icon='clock' size={ 25 }/>
                                    <Text style={{ fontSize: 15 , marginLeft: 8, flex: 1, alignSelf: 'center' }}> Horas impartidas </Text>
                                </View>

                                <Text style={{ fontSize: 15, marginLeft: 8 }}>
                                    {tutor.hours_done}
                                </Text>
                            </ListItem>
                            
                        </List>

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
                    
                    <TouchableOpacity
                        style={ style.buttonRequest }
                        onPress={()=>toggleModal()}
                        // onPress={ navigation.navigate('conversations', { tutor_id: tutor.id })}
                        >
                        <Text style={ style.txtButtonRquest}> Solicitar Tutoria </Text>
                    </TouchableOpacity>
                    <Modal 
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight} 
                        isVisible={isModalVisible} 
                        onBackdropPress={() => setModalVisible(false)}>
                        <View>
                            <Card>
                                <CardItem header bordered>
                                    <View>
                                        <TextInput
                                            placeholder='Curso'
                                            onChangeText={text => changeCourse(text)}
                                            value={course}
                                        />
                                        <TextInput
                                            placeholder='Fecha'
                                            onChangeText={text => changeDate(text)}
                                            value={date}
                                        />
                                    </View>
                                </CardItem>
                            </Card>
                            <Button style={ style.buttonLogin }  onPress={toggleModal}>
                                <Text style={style.txtButtonLogin}>Cerrar</Text>
                            </Button>
                            <Button style={ style.buttonLogin }  onPress={()=>{createTutoria(uuidv4(), tutor.id,authUserId,date,course);toggleModal()}}>
                                <Text style={style.txtButtonLogin}>Crear Tutoria</Text>
                            </Button>
                        </View>
                    </Modal>
                    {/* <Card>
                        <CardItem button onPress={() => navigation.navigate('conversations', { tutor_id: tutor.id })}>
                            <Text>
                                Solicitar Tutoria
                            </Text>
                        </CardItem>
                    </Card> */}
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
        authUserId: selectors.getAuthUserID(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingUsers());
            dispatch(tutoresactions.startFetchingTutores());
        },
        createTutoria(id, tutorId, tutoradoId, date, course){
            dispatch(tutoriaActions.startAddTutoria({id:id, tutorId:tutorId, tutoradoId:tutoradoId, date:date, course:course}));
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
    },
    buttonRequest: {
        width: '100%',
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#146dc7',
        paddingLeft: '22%',
        paddingRight: '22%',
        paddingTop: 7,
        paddingBottom: 7,
    },
    txtButtonRquest: {
        width: '100%',
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    buttonLogin: {
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: '#146dc7',
        color: 'white',
        paddingLeft: '39%',
        paddingRight: '39%',
        paddingTop: 7,
        paddingBottom: 7,
    },
    txtButtonLogin: {
        color: 'white',
        fontSize: 19,
    },
})
