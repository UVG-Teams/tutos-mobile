import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Show from './apps/show'

const Stack = createStackNavigator()

export const routes = [
    {
        displayName: 'Show',
        name: 'show',
        component: Show,
    },
]



const EventsApp = () => (
    <NavigationContainer independent={ true }>
        <Stack.Navigator
            initialRouteName="list"
            screenOptions={{ headerShown: false }}
        >
            {
                routes.map(route => (
                    <Stack.Screen
                        key={ route.name }
                        name={ route.name }
                        component={ route.component }
                    />
                ))
            }
        </Stack.Navigator>
    </NavigationContainer>
)

export default EventsApp