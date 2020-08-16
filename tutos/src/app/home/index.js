import React, {component} from 'react'
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

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'


const Home = ({ navigation }) => (
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
                <Right>
                    <Button transparent
                        onPress={ () => navigation.navigate('Notifications') }
                    >
                        <FontAwesomeIcon style={ theme.headerIcon } icon='bell' size={ 25 } />
                    </Button>
                </Right>
            </Header>
            <Content style={ theme.content }>
                <View>
                    <Text style={{ fontSize: 35 }}>BIENVENIDO</Text>
                    <Text style={{ fontSize: 20 }}>My Name</Text>

                    <Card>
                        <CardItem header bordered button onPress={() => alert("Que onda, esto es header")}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Programadas</Text>
                        </CardItem>
                        <CardItem bordered button onPress={() => alert("Hola, esto es el body")}>
                            <Body>
                                <Text>
                                    Tutoría Física 3 José Block
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header bordered button onPress={() => alert("Que onda, esto es header")}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>En curso</Text>
                        </CardItem>
                        <CardItem bordered button onPress={() => alert("Hola, esto es el body")}>
                            <Body>
                                <Text>
                                    Tutoría IPC Andy
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header bordered button onPress={() => alert("Que onda, esto es header")}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Terminadas</Text>
                        </CardItem>
                        <CardItem bordered button onPress={() => alert("Hola, esto es el body")}>
                            <Body>
                                <Text>
                                    Tutoría Estadística Willi
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            </Content>
        </Container>
    </ImageBackground>
)

export default Home
