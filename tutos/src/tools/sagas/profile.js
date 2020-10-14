import {
    call,
    takeEvery,
    select,
    put,
} from 'redux-saga/effects';


import * as types from './../types/profile'
import * as selectors from '../reducers/index'
import * as actions from './../actions/profile'
import * as http from '../utils/http';
import {
    API_BASE_URL,
} from '../../settings';
import { Body } from 'native-base';

function* getProfile(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth){
            const id = yield select(selectors.getAuthUserID)
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/userdetails/${id}/`,
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
                const institutionResponse = yield call(
                    fetch,
                    `${API_BASE_URL}/institutions/${jsonResult.institution}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${token}`,
                        }
                    }
                )
                if (http.isSuccessful(institutionResponse.status)){
                    jsonInstitution  = yield institutionResponse.json()
                    jsonResult.institution = jsonInstitution
                }
                const locationResponse = yield call(
                    fetch,
                    `${API_BASE_URL}/locations/${jsonResult.location}/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${token}`,
                        }
                    }
                )
                if (http.isSuccessful(locationResponse.status)){
                    jsonLocation = yield locationResponse.json()
                    jsonResult.location = jsonLocation
                }

                const careerResponse = yield call(
                    fetch,
                    `${API_BASE_URL}/careers/${jsonResult.career}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${token}`,
                        }
                    }
                )
                if (http.isSuccessful(careerResponse.status)){
                    jsonCareer = yield careerResponse.json()
                    jsonResult.career = jsonCareer
                }
                
                // FINAL ACTION PROFILE
                yield put(actions.completeGetProfile(jsonResult))
            }else{
                const { non_field_errors } = yield response.json()
                yield put(actions.failGetProfile(non_field_errors[0]))
            }
        }
    }catch(error){
        yield put(actions.failGetProfile('Connection error!'))
    }
}

export function* watchGetProfile(){
    yield takeEvery(
        types.GET_PROFILE_STARTED,
        getProfile
    )
}

function* updateProfile(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth) {
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/userdetails/edit/`,
                {
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if (http.isSuccessful(response.status)) {
                const jsonResult = yield response.json();
                yield put(actions.completeEditProfile(jsonResult))
                yield put(actions.startGetProfile())
            } else {
                const { non_field_errors } = yield response.json()
                yield put(actions.failEditProfile(non_field_errors[0]))
            }
        }
    }catch(error){
        yield put(actions.failEditProfile('Connection error!'))
    }
}

export function* watchUpdateProfile() {
    yield takeEvery(
        types.EDIT_PROFILE_STARTED,
        updateProfile
    )
}
