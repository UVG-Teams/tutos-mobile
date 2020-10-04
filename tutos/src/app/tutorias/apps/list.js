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
import * as actions from '../../../tools/actions/tutorias'

const List = ({ 
    navigation,
    tutorias,
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
                    <Text style={{ fontSize: 35 }}>Tutorias</Text>   
                    {
                        tutorias.map(tutoria => (
                            <Card key={ tutoria.id }>
                                <CardItem button onPress = {() => navigation.navigate("show", { id: tutoria.id })}>
                                    <Body>
                                        <Row>
                                            <Col>
                                                <Text style={{ fontWeight: "bold" }}>
                                                    {tutoria.total_price}
                                                </Text>
                                            </Col>
                                            <Col >
                                                {/* <Text style={{textAlign:'right'}}>
                                                    <FontAwesomeIcon style={ theme.CardItem} icon='star' size={ 10 } />
                                                    {selectors.getTutor(state, user.id).score}
                                                </Text> */}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {/* <Text>
                                                    {selectors.getTutor(state, user.id).description}
                                                </Text> */}
                                            </Col>
                                            <Col>         
                                                {/* <Text style={{textAlign:'right'}}>
                                                Q{selectors.getTutor(state, user.id).individual_price}
                                                </Text>    */}
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
        tutorias: selectors.getTutorias(state),
        isLoading: selectors.isFetchingTutorias(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startGetTutorias());
        },
    }),
)(List);
