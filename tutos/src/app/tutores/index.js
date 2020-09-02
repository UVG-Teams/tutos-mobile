import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ImageBackground,
} from 'react-native'

import {
    Container,
    Content,
    Button,
    Header,
    Left,
    Right,
    Body,
    Title,
    Card,
    CardItem,
    Row,
    Col,
} from 'native-base'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'

import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/users'

const Tutores = ({ 
    navigation,
    users,
    isLoading,
    onLoad,
}) => {
    useEffect(onLoad, [])
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
            
            </Header>
            <Content style={ theme.content }>
                <View>
                    <Text style={{ fontSize: 35 }}>Tutores</Text>   
                    {
                        users.map(user => user.is_tutor && (
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Row>
                                            <Col>
                                                <Text style={{ fontWeight: "bold" }}>
                                                    {user.first_name}
                                                    {" "} 
                                                    {user.last_name}
                                                </Text>
                                            </Col>
                                            <Col >
                                                <Text style={{textAlign:'right'}}>
                                                    <FontAwesomeIcon style={ theme.CardItem} icon='star' size={ 10 } />
                                                    {/* {user.calificacion} */}
                                                    5
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Text>
                                                    {/* {user.themes} */}
                                                    Fisica3
                                                </Text>
                                            </Col>
                                            <Col>         
                                                <Text style={{textAlign:'right'}}>
                                                    {/* {user.price} */}
                                                    Q100
                                                </Text>   
                                            </Col>
                                        </Row>
                                    </Body>
                                </CardItem>
                            </Card>
                        ))      
                    }
                </View>
            </Content>
        </Container>
    </ImageBackground>
)}

export default connect(
    state => ({
        users: selectors.getUsers(state),
        isLoading: selectors.isFetchingUsers(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingUsers());
        },
    }),
)(Tutores);
