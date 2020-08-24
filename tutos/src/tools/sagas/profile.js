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

function* getProfile(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        const id = yield select(selectors.getAuthUserID)
        if (isAuth){
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/users/${id}/detail/`,
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


