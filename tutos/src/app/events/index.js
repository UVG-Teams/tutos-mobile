import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Show from './apps/show'
import New from './apps/new'
import Edit from './apps/edit'

const Stack = createStackNavigator()

export const routes = [
    {
        displayName: 'Show',
        name: 'show',
        component: Show,
    },
    {
        displayName: 'New',
        name: 'new',
        component: New,
    },
    {
        displayName: 'Edit',
        name: 'edit',
        component: Edit
    }
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