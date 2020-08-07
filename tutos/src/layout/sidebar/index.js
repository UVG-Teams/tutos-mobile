import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Row, Grid, List, ListItem } from 'native-base'

import { theme } from '../themes'
import { routes } from '../../../src/routes'
import * as selectors from '../../tools/reducers'
import * as actions from '../../tools/actions/auth'


const SideBar = ({ props, isAuthenticated, logout, navigation }) => (
    <View style={{ flex:1 }}>
        <DrawerContentScrollView { ...props }>
            <View>
                <View>
                    {
                        isAuthenticated ? (
                            <>
                                {/* <Image
                                    style={ styles.logo }
                                    source={{
                                        uri: 'https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
                                    }}
                                /> */}
                                <FontAwesomeIcon icon='user-circle' size={ 125 } style={{ ...theme.sidebarIcon, margin: 20 }} />
                                <View>
                                    <Text style={ styles.username }>MY NAME</Text>
                                </View>
                            </>
                        ) : (<></>)
                    }
                </View>
                {
                    routes.filter(
                        route => route.authProtection == isAuthenticated
                    ).map(route => route.showOnSidebar && (
                        <Row>
                            <FontAwesomeIcon icon={ route.icon } size={ 25 } style={{ ...theme.sidebarIcon, marginTop: 15, marginLeft: 15 }} />
                            <DrawerItem
                                key={ route.name }
                                label={ route.name }
                                onPress={ () => navigation.navigate(route.name) }
                                style={{ width: '75%' }}
                            />
                        </Row>
                    ))
                }
            </View>
        </DrawerContentScrollView>
        {
            isAuthenticated ? (
                <>
                    {/* <Row>
                        <FontAwesomeIcon icon='sign-out-alt' size={ 25 } style={{ marginTop: 15, marginLeft: 15 }} />
                    </Row> */}
                    <DrawerItem
                        label='Logout'
                        onPress={ logout }
                        style={{ width: '75%' }}
                    />
                </>
            ) : (<></>)
        }
    </View>
)

export default connect(
    state => ({
        isAuthenticated: selectors.isAuthenticated(state),
    }),
    dispatch => ({
        logout() {
            dispatch(actions.logout())
        }
    })
)(SideBar)


const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        borderRadius: 50,
    },
    username: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 15,
    },
})
