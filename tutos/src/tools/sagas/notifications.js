import {
    call,
    takeEvery,
    select,
    put,
} from 'redux-saga/effects';


import * as types from './../types/notifications'
import * as selectors from '../reducers/index'
import * as actions from './../actions/notifications'
import { normalize } from 'normalizr';
import * as http from '../utils/http';
import * as schemas from './../schemas/notifications'
import {
    API_BASE_URL,
} from '../../settings';

function* getNotifications(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth){
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/notifications/`,
                {
                    method: 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if(http.isSuccessful(response.status)){
                const jsonResult = yield response.json();
                const {
                    entities: {notifications}, 
                    result,
                } = normalize(jsonResult, schemas.notifications)
                yield put (actions.completeGetNotifications(notifications, result))
            }else{
                const {non_field_errors } = yield response.json;
                yield put(actions.failGetNotifications(non_field_errors[0]))
            }
        }
    }catch(error){
        yield put(actions.failGetNotifications('Connection error!'))
    }
}

export function* watchGetNotifications(){
    yield takeEvery(
        types.GET_NOTIFICATIONS_STARTED,
        getNotifications
    )
}

function* addNotification(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth) {
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/notifications/`,
                {
                    method: 'POST',
                    body : JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            )
            if (http.isSuccessful(response.status)) {
                const jsonResult = yield response.json();
                yield put(actions.completeAddNotification(
                    action.payload.id, 
                    jsonResult
                )) 
            } else {
                const { non_field_errors } = yield response.json;
                yield put(actions.failAddNotification(non_field_errors[0]))
            }
        }
    } catch (error) {
        yield put(actions.failGetNotifications('Connection error!'))
    }
}

export function* watchAddNotification() {
    yield takeEvery(
        types.ADD_NOTIFICATION_STARTED,
        addNotification
    )
}

function* deleteNotification(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth) {
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/notifications/${action.payload.id}/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            )
            if (http.isSuccessful(response.status)) {
                yield put(actions.completeDeleteNotification())
            } else {
                const { non_field_errors } = yield response.json;
                yield put(actions.failDeleteNotification(non_field_errors[0]))
            }
        }
    } catch (error) {
        yield put(actions.failGetNotifications('Connection error!'))
    }
}

export function* watchDeleteNotification() {
    yield takeEvery(
        types.DELETE_NOTIFICATION_STARTED,
        deleteNotification
    )
}