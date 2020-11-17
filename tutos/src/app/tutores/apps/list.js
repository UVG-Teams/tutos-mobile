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
    Grid,
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
                        users.map(user => user && user.is_tutor && (
                            <Card key={ user.id }>
                                <CardItem button onPress = {() => navigation.navigate("show", {id: user.id})}>
                                    <Body>
                                        
                                        <Grid>
                                            <Col style={{ width: '20%' }}>
                                                <FontAwesomeIcon icon='user-circle' size={ 50 } style={{ ...theme.sidebarIcon, margin: 10 }} />
                                            </Col>

                                            <Col style={{ flex: 1, alignSelf: 'center' }}>
                                                <Text style={{ fontWeight: "bold" }}>
                                                    {user.first_name} {user.last_name}
                                                </Text>
                                                <Text>
                                                    {selectors.getTutor(state, user.id).description}
                                                </Text>
                                            </Col>

                                            <Col style={{ flex: 0.3, alignSelf: 'center', width: '20%' }}>
                                                <Text>
                                                    <FontAwesomeIcon style={ theme.CardItem} icon='star' size={ 15 }/>
                                                    {" "}{selectors.getTutor(state, user.id).score}
                                                </Text>

                                                <Text>
                                                    Q{selectors.getTutor(state, user.id).individual_price}
                                                </Text>   
                                            </Col>
                                        </Grid>
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
