import{
    call,
    takeEvery,
    select,
    put,
}from 'redux-saga/effects';
import {normalize} from 'normalizr';

import * as types from '../types/tutores';
import * as actions from '../actions/tutores';
import * as selectors from '../reducers';
import * as schemas from '../schemas/tutores';

import * as http from '../utils/http';
import{
    API_BASE_URL,
}from '../settings';

function* fetchTutor(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tutores/`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if(http.isSuccessful(response.status)){
                const jsonResult = yield response.json();
                const {
                    entities:{tutores},
                    result,
                } = normalize(jsonResult, schemas.tutores);
                yield put(actions.completeFetchingTutor(schemas.tutores, result));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failFetchingTutor(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failFetchingTutor('Connection failed!'))
    }

}
export function* watchFetchTutores(){
    yield takeEvery(
        types.FETCH_TUTORES_STARTED,
        fetchTutor,
    )
}

function* addTutor(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tutores/`,
                {
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if(http.isSuccessful(response.status)){
                const jsonResult = yield response.json();
                yield put(actions.completeAddingTutor(
                    action.payload.tutor.id, 
                    jsonResult,
                    ));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failAddingTutor(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failAddingTutor('Connection failed!'))
    }
}

export function* watchAddTutor(){
    yield takeEvery(
        types.ADD_TUTOR_STARTED,
        addTutor,
    )
}

function* removeTutor(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tutores/${action.payload.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if(http.isSuccessful(response.status)){
                yield put(actions.completeRemovingTutor());
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failRemovingTutor(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failRemovingTutor('Connection failed!'))
    }
}

export function* watchRemoveTutor(){
    yield takeEvery(
        types.REMOVE_TUTOR_STARTED,
        removeTutor,
    )
}