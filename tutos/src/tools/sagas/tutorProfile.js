import {
  call,
  takeEvery,
  select,
  put,
} from 'redux-saga/effects';

import * as types from '../types/tutorProfile'
import * as selectors from '../reducers'
import * as actions from '../actions/tutorProfile'
import * as http from '../utils/http'
import { getProfile } from '../reducers/profile';
import {
  API_BASE_URL,
} from '../../settings';

function* getTutorProfile(action){
  try{
    const isAuth = yield select(selectors.isAuthenticated)
    if (isAuth){
      const id = yield select(selectors.getAuthUserID)
      const token = yield select(selectors.getToken)
      const response = yield call(
        fetch,
        `${API_BASE_URL}/tutores/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          }
        }
      )
      if(http.isSuccessful(response.status)){
        const jsonResult = yield response.json()
        yield put(actions.completeGetTutorProflie(jsonResult))
      }else{
        const { non_field_errors } = yield response.json()
        yield put(actions.failGetTutorProfile(non_field_errors[0]))
      }
    }else{
      yield put(actions.failGetTutorProfile('No auth!'))
    }
  }catch (error){
    
    yield put(actions.failGetTutorProfile('Connection Error'))
  }
}

export function* watchGetTutorProfile(){
  yield takeEvery(
    types.GET_TUTOR_PROFILE_STARTED,
    getTutorProfile
  )
}

function* updateTutorProfile(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if (isAuth) {
            const id = yield select(selectors.getAuthUserID)
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tutores/${id}/`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if (http.isSuccessful(response.status)) {
                const jsonResult = yield response.json();
                yield put(actions.completeEditTutorProfile(jsonResult))
                yield put(actions.startGetTutorProfile())
            } else {
                const { non_field_errors } = yield response.json()
                yield put(actions.failEditProfile(non_field_errors[0]))
            }
        }
    }catch(error){
        yield put(actions.failEditTutorProfile('Connection error!'))
    }
}

export function* watchUpdateTutorProfile(){
  yield takeEvery(
    types.EDIT_TUTOR_PROFILE_STARTED,
    updateTutorProfile
  )
}