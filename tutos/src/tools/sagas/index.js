import { fork, all } from 'redux-saga/effects'

import {
    watchLoginStarted,
    watchRefreshTokenStarted,
} from './auth'

import {
    watchGetProfile,
    watchUpdateProfile
} from './profile'

import { watchSignUpStarted } from './signUp'

import {
    watchGetTutorias,
    watchAddTutoria,
    watchDeleteTutoria
}from './tutorias'

import {
    watchFetchUsers,
} from './users'

import { 
    watchGetTutorProfile,
    watchUpdateTutorProfile
} from './tutorProfile'

import {
    watchFetchTutores,
} from './tutores'

import {
    watchFetchLanguages,
} from './languages'

import {
    watchFetchCareers
} from './careers'

import {
    watchFetchLocation
} from './location'

import {
    watchFetchInstitution
} from './institution'

import {
    watchGetNotifications,
    watchAddNotification,
    watchDeleteNotification
} from './notifications'
import {
    watchGetEvents,
    watchAddEvent,
    watchDeleteEvent,
    watchEditEvent
} from './events'

function* mainSaga() {
    yield all([
        fork(watchLoginStarted),
        fork(watchSignUpStarted),
        fork(watchRefreshTokenStarted),
        fork(watchGetTutorias),
        fork(watchAddTutoria),
        fork(watchDeleteTutoria),
        fork(watchGetProfile),
        fork(watchFetchUsers),
        fork(watchGetTutorProfile),
        fork(watchUpdateProfile),
        fork(watchUpdateTutorProfile),
        fork(watchFetchTutores),
        fork(watchFetchLanguages),
        fork(watchFetchCareers),
        fork(watchFetchLocation ),
        fork(watchFetchInstitution),
        fork(watchGetNotifications),
        fork(watchAddNotification),
        fork(watchDeleteNotification),
        fork(watchGetEvents),
        fork(watchAddEvent),
        fork(watchDeleteEvent),
        fork(watchEditEvent),
    ])
}


export default mainSaga
