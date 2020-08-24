import { fork, all } from 'redux-saga/effects'

import {
    watchLoginStarted,
    watchRefreshTokenStarted,
} from './auth'

import {watchGetProfile} from './profile'

import { watchSignUpStarted } from './signUp'

import {
    watchGetTutorias,
    watchAddTutoria,
    watchDeleteTutoria
}from './tutorias'



function* mainSaga() {
    yield all([
        fork(watchLoginStarted),
        fork(watchSignUpStarted),
        fork(watchRefreshTokenStarted),
        fork(watchGetTutorias),
        fork(watchAddTutoria),
        fork(watchDeleteTutoria),
        fork(watchGetProfile),
    ])
}


export default mainSaga
