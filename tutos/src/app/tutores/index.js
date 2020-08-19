import React, { Component } from 'react'
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


const Tutores = ({ navigation }) => (
    
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
                    <Card>
                      <CardItem>
                        <Body>
                            <Row>
                                <Col>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Marco Polo
                                    </Text>
                                </Col>
                                <Col >
                                    <Text style={{textAlign:'right'}}>
                                        <FontAwesomeIcon style={ theme.CardItem} icon='star' size={ 10 } />
                                        5
                                    </Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Text>
                                        Fisica3
                                    </Text>
                                </Col>
                                <Col>         
                                    <Text style={{textAlign:'right'}}>
                                        Q100
                                    </Text>   
                                </Col>
                            </Row>
                        </Body>
                      </CardItem>
                    </Card>
                </View>
            </Content>
        </Container>
    </ImageBackground>
)

export default Tutores
