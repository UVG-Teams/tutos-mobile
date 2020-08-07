import React from 'react'
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
    Body,
    Right,
    Title,
    Card,
    CardItem,
} from 'native-base'

import { Col, Row, Grid } from 'react-native-easy-grid'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'


const Profile = ({ navigation }) => (
    <ImageBackground
        style={ theme.background }
    >
        <Container style={{ backgroundColor: 'transparent'}}>
            <Header>
                <Left>
                    <Button transparent
                        onPress={ () => navigation.openDrawer() }
                    >
                        <FontAwesomeIcon icon='bars' size={ 25 } />
                    </Button>
                </Left>
                <Body></Body>
                <Right></Right>
            </Header>
            <Content style={ theme.content }>
                <View>
                    <Text style={{ fontSize: 35 }}>Profile</Text>
                    <Text style={{ fontSize: 20 }}>My Name</Text>
                </View>
            </Content>
        </Container>
    </ImageBackground>
)

export default Profile
