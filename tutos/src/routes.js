import Home from './app/home'
import Profile from './app/profile'
import SignUp from './app/signUp'
import Calendar from './app/calendar'
import Tutores from './app/tutores'


export const routes = [
    {
        name: 'Home',
        component: Home,
        icon: 'home',
    },
    {
        name: 'Profile',
        component: Profile,
        icon: 'profile',
    },
    {
        name: 'Calendar',
        component: Calendar,
        icon: 'calendar',
    },
    {
        name: 'SignUp',
        component: SignUp,
        icon: 'signup',
    },
    {
        name: 'Tutores',
        component: Tutores,
        icon: 'tutores',
    },
]
