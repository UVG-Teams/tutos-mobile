import Login from './app/login'
import Home from './app/home'
import Profile from './app/profile'
import SignUp from './app/signUp'
import Calendar from './app/calendar'
import Tutores from './app/tutores'


export const routes = [
    {
        name: 'Login',
        component: Login,
        icon: 'login',
        authProtection: false,
    },
    {
        name: 'Home',
        component: Home,
        icon: 'home',
        authProtection: true,
    },
    {
        name: 'SignUp',
        component: SignUp,
        icon: 'signup',
        authProtection: false,
    },
    {
        name: 'Profile',
        component: Profile,
        icon: 'profile',
        authProtection: true,
    },
    {
        name: 'Calendar',
        component: Calendar,
        icon: 'calendar',
        authProtection: true,
    },
    {
        name: 'Tutores',
        component: Tutores,
        icon: 'tutores',
        authProtection: true,
    },
]
