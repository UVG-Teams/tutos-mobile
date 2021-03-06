import Index from './app/index'
import Login from './app/login'
import Home from './app/home'
import Profile from './app/profile'
import SignUp from './app/signUp'
import Calendar from './app/calendar'
import Events from './app/events'
import Tutorias from './app/tutorias'
import Tutores from './app/tutores'
import Conversations from './app/conversations'
import Schedule from './app/schedule'
import Notifications from './app/notifications'


export const routes = [
    {
        name: 'index',
        displayName: 'Index',
        component: Index,
        icon: 'home',
        authProtection: false,
        showOnSidebar: true,
    },
    {
        name: 'login',
        displayName: 'Login',
        component: Login,
        icon: 'sign-in-alt',
        authProtection: false,
        showOnSidebar: true,
    },
    {
        name: 'home',
        displayName: 'Inicio',
        component: Home,
        icon: 'home',
        authProtection: true,
        showOnSidebar: true,
    },
    {
        name: 'signup',
        displayName: 'Sign Up',
        component: SignUp,
        icon: 'user-plus',
        authProtection: false,
        showOnSidebar: true,
    },
    {
        name: 'profile',
        displayName: 'Perfil',
        component: Profile,
        icon: 'user',
        authProtection: true,
        showOnSidebar: false,
    },
    {
        name: 'calendar',
        displayName: 'Calendario',
        component: Calendar,
        icon: 'calendar',
        authProtection: true,
        showOnSidebar: true,
    },
    {
        name: 'events',
        displayName: 'Eventos',
        component: Events,
        icon: 'calendar-day',
        authProtection: true,
        showOnSidebar: false,
    },
    {
        name: 'tutorias',
        displayName: 'Tutorias',
        component: Tutorias,
        icon: 'users',
        authProtection: true,
        showOnSidebar: true,
        defaultRoute: 'list',
    },
    {
        name: 'tutores',
        displayName: 'Tutores',
        component: Tutores,
        icon: 'users',
        authProtection: true,
        showOnSidebar: true,
        defaultRoute: 'list',
    },
    {
        name: 'inbox',
        displayName: 'Bandeja de entrada',
        component: Conversations,
        icon: 'comments',
        authProtection: true,
        showOnSidebar: false,
        defaultRoute: 'list',
    },
    {
        name: 'schedule',
        displayName: 'Horario',
        component: Schedule,
        icon: 'calendar-alt',
        authProtection: true,
        showOnSidebar: false,
        defaultRoute: 'show',
    },
    {
        name: 'notifications',
        displayName: 'Notificaciones',
        component: Notifications,
        icon: 'bell',
        authProtection: true,
        showOnSidebar: false,
        defaultRoute: 'list',
    },
]
