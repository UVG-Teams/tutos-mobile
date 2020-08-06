import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer'
import { connect } from 'react-redux'

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
                                <Image
                                    style={ styles.logo }
                                    source={{
                                        uri: 'https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
                                    }}
                                />
                                <View>
                                    <Text style={ styles.username }>MY NAME</Text>
                                </View>
                            </>
                        ) : (<></>)
                    }
                </View>
                {
                    isAuthenticated ? (
                        <>
                            {
                                routes.map(route => (
                                    <DrawerItem
                                        key={ route.name }
                                        label={ route.name }
                                        onPress={ () => navigation.navigate(route.name) }
                                    />
                                ))
                            }
                        </>
                    ) : (
                        <>
                            <DrawerItem
                                label='Login'
                                onPress={() => navigation.navigate('Login')}
                            />
                        </>
                    )
                }
            </View>
        </DrawerContentScrollView>
        {
            isAuthenticated ? (
                <>
                    <DrawerItem
                        label='Logout'
                        onPress={ logout }
                    />
                </>
            ) : (
                <></>
            )
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
