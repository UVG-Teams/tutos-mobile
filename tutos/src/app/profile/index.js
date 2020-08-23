import React from 'react'
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
} from 'native-base'
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { theme } from './../../layout/themes'

import * as selectors from '../../tools/reducers/profile'
import profileImg from '../../assets/profile1.png'
const style = StyleSheet.create({
    img:{
        width: 150,
        height: 150,
    }
})

const Profile = ({ navigation , profile }) => {
    console.log(profile)
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
                <Right></Right>
            </Header>
            <Content style={ theme.content }>
                <View>
                    <Grid>
                        <Col>
                            <Image style={style.img} source =  {profileImg}/>
                        </Col>
                        <Col>
                            <Text style={{ fontSize: 35 }}>{profile.username} </Text>
                            <Text style={{ fontSize: 25 }}>{profile.first_name} {profile.last_name} </Text>
                            <Text style={{ fontSize: 20 }}>{profile.email}</Text>
                        </Col>
                    </Grid>
                    
                </View>
            </Content>
        </Container>
    </ImageBackground>)
}

export default connect(
    state => ({
        profile : selectors.getProfile(state) 
    }),
    dispatch => ({

    })
)(Profile)
