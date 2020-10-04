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

import { theme } from '../../../layout/themes'

import * as selectors from '../../../tools/reducers'
import * as actions from '../../../tools/actions/users'
import * as tutoresactions from '../../../tools/actions/tutores'

const Tutores = ({ 
    navigation,
    users,
    isLoading,
    onLoad,
    state,
}) => {
    useEffect(onLoad, [])
    return (
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
                            <Card key={ user.id }>
                                <CardItem button onPress = {() => navigation.navigate("show", {id: user.id})}>
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
                                                    {selectors.getTutor(state, user.id).score}
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Text>
                                                    {selectors.getTutor(state, user.id).description}
                                                </Text>
                                            </Col>
                                            <Col>         
                                                <Text style={{textAlign:'right'}}>
                                                Q{selectors.getTutor(state, user.id).individual_price}
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
    )
}

export default connect(
    state => ({
        users: selectors.getUsers(state),
        isLoading: selectors.isFetchingUsers(state),
        state: state,
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingUsers());
            dispatch(tutoresactions.startFetchingTutores());
        },
    }),
)(Tutores);
