import {
    call,
    takeEvery,
    select,
    put,
} from 'redux-saga/effects';


import * as types from './../types/events'
import * as selectors from '../reducers/index'
import * as actions from './../actions/events'
import { normalize } from 'normalizr';
import * as http from '../utils/http';
import * as schemas from './../schemas/events'
import {
    API_BASE_URL,
} from '../../settings';

function* getEvents(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth){
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/events/`,
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
                    entities: {events}, 
                    result,
                } = normalize(jsonResult, schemas.events)
                yield put (actions.completeGetEvents(events, result))
            }else{
                const {non_field_errors } = yield response.json;
                yield put(actions.failGetEvents(non_field_errors[0]))
            }
        }
    }catch(error){
        yield put(actions.failGetEvents('Connection error!'))
    }
}

export function* watchGetEvents(){
    yield takeEvery(
        types.GET_EVENTS_STARTED,
        getEvents
    )
}

function* addEvent(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth) {
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/events/`,
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
                yield put(actions.completeAddEvent(
                    action.payload.id, 
                    jsonResult
                )) 
            } else {
                const { non_field_errors } = yield response.json;
                yield put(actions.failAddEvent(non_field_errors[0]))
            }
        }
    } catch (error) {
        yield put(actions.failGetEvents('Connection error!'))
    }
}

export function* watchAddEvent() {
    yield takeEvery(
        types.ADD_EVENT_STARTED,
        addEvent
    )
}

function* deleteEvent(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth) {
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/events/${action.payload.id}/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            )
            if (http.isSuccessful(response.status)) {
                yield put(actions.completeDeleteEvent())
            } else {
                const { non_field_errors } = yield response.json;
                yield put(actions.failDeleteEvent(non_field_errors[0]))
            }
        }
    } catch (error) {
        yield put(actions.failGetEvents('Connection error!'))
    }
}

export function* watchDeleteEvent() {
    yield takeEvery(
        types.DELETE_EVENT_STARTED,
        deleteEvent
    )
}