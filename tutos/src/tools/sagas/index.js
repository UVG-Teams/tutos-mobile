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
    ])
}


export default mainSaga
