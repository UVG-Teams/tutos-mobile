import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import List from './apps/list'
import Show from './apps/show'

const Stack = createStackNavigator()

export const routes = [
    {
        displayName: 'List',
        name: 'list',
        component: List,
    },
    {
        displayName: 'Show',
        name: 'show',
        component: Show,
    },
]



const TutoresApp = () => (
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

export default TutoresApp