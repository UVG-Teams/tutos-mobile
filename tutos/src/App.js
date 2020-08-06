import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { connect } from 'react-redux'

import { routes } from './routes'
import * as selectors from './tools/reducers'
import Login from './app/login'


const Drawer = createDrawerNavigator()

const App = ({ isAuthenticated }) => (
    <NavigationContainer>
        <Drawer.Navigator 
            initialRouteName="Login"
            // drawerContent={ props => <SideBar { ...props } /> }
        >
            {
                isAuthenticated ? (
                    <>
                        {
                            routes.map(route => (
                                <Drawer.Screen
                                    key={ route.name }
                                    name={ route.name }
                                    component={ route.component }
                                />
                            ))
                        }
                    </>
                ) : (
                    <>
                        <Drawer.Screen name="Login" component={ Login } />
                    </>
                )
            }
        </Drawer.Navigator>
    </NavigationContainer>
)


export default connect(
    state => ({
        isAuthenticated: selectors.isAuthenticated(state),
    })
)(App)
