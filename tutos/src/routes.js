import Login from './app/login'
import Home from './app/home'
import Profile from './app/profile'
import SignUp from './app/signUp'
import Calendar from './app/calendar'
import Tutores from './app/tutores'
import Conversations from './app/conversations'
import Schedule from './app/schedule'
import Notifications from './app/notifications'


export const routes = [
    {
        name: 'Login',
        component: Login,
        icon: 'sign-in-alt',
        authProtection: false,
        showOnSidebar: true,
    },
    {
        name: 'Home',
        component: Home,
        icon: 'home',
        authProtection: true,
        showOnSidebar: true,
    },
    {
        name: 'SignUp',
        component: SignUp,
        icon: 'user-plus',
        authProtection: false,
        showOnSidebar: true,
    },
    {
        name: 'Profile',
        component: Profile,
        icon: 'user',
        authProtection: true,
        showOnSidebar: true,
    },
    {
        name: 'Calendar',
        component: Calendar,
        icon: 'calendar',
        authProtection: true,
        showOnSidebar: true,
    },
    {
        name: 'Tutores',
        component: Tutores,
        icon: 'users',
        authProtection: true,
        showOnSidebar: true,
    },
    {
        name: 'Conversations',
        component: Conversations,
        icon: 'comments',
        authProtection: true,
        showOnSidebar: true,
    },
    {
        name: 'Schedule',
        component: Schedule,
        icon: 'calendar-week',
        authProtection: true,
        showOnSidebar: true,
    },
    {
        name: 'Notifications',
        component: Notifications,
        icon: 'bell',
        authProtection: true,
        showOnSidebar: false,
    },
]
