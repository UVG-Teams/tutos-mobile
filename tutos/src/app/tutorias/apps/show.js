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
import * as actions from '../../../tools/actions/tutorias'


const Show = ({ navigation, tutoria, onLoad} ) => {
    // useEffect(onLoad , [])
    return (
        <ImageBackground
            style={ theme.background }
        >
            <Container style={{ backgroundColor: 'transparent' }}>
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
                    </View>
                </Content>
            </Container>
        </ImageBackground>
    )
}

export default connect(
    (state, { route }) => ({
        tutoria: selectors.getTutoria(state, route.params.id),
    }),
    dispatch => ({
        onLoad() {
        },
    })
)(Show)

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
