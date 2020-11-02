import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { connect } from 'react-redux'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faBars,
    faHome,
    faUser,
    faUserCircle,
    faCalendar,
    faUsers,
    faSignInAlt,
    faUserPlus,
    faSignOutAlt,
    faBell,
    faComments,
    faCalendarWeek,
    faAddressCard,
    faStar,
    faInbox,
    faAt,
    faEnvelope,
    faLocationArrow,
    faGraduationCap,
    faAdjust,
    faChevronLeft,
    faClock,
    faCalendarDay,
    faCalendarAlt,
    faPhone,
    faTrash,
    faUniversity,
} from '@fortawesome/free-solid-svg-icons'
import { useCavy, hook, wrap } from 'cavy'

import { routes } from './routes'
import * as selectors from './tools/reducers'
import SideBar from './layout/sidebar'


library.add(
    faBars,
    faHome,
    faUser,
    faUserCircle,
    faCalendar,
    faUsers,
    faSignInAlt,
    faUserPlus,
    faSignOutAlt,
    faBell,
    faComments,
    faCalendarWeek,
    faAddressCard,
    faStar,
    faInbox,
    faAt,
    faEnvelope,
    faLocationArrow,
    faGraduationCap,
    faAdjust,
    faChevronLeft,
    faClock,
    faCalendarDay,
    faCalendarAlt,
    faPhone,
    faTrash,
    faUniversity,
)

const Drawer = createDrawerNavigator()

const App = ({ isAuthenticated }) => {
    const generateTestHook = useCavy();

    return (
    <NavigationContainer
        ref={ generateTestHook('AppNavigation') }
    >
        <Drawer.Navigator 
            initialRouteName="index"
            drawerContent={ props => <SideBar { ...props } /> }
        >
            {
                routes.filter(
                    route => route.authProtection == isAuthenticated
                ).map(route => (
                    <Drawer.Screen
                        key={ route.name }
                        name={ route.name }
                        component={ route.component }
                    />
                ))
            }
        </Drawer.Navigator>
    </NavigationContainer>
)}


export default connect(
    state => ({
        isAuthenticated: selectors.isAuthenticated(state),
    })
)(App)
