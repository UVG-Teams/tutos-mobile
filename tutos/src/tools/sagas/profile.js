import {
  call,
  takeEvery, 
  put,
  select
} from 'redux-saga/effects'

import * as selectors from '../reducers'
import * as actions from '../actions/profile'
import * as types from '../types/profile'
import * as http from '../utils/http'
import {
    API_BASE_URL,
} from '../../settings'

function* fetchProfile(action){
  try{
    const id = yield select(selectors.getAuthUserID)
    const response = yield call(
      fetch,
      `${API_BASE_URL}/users/${id}/detail`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (http.isSuccessful(response.status)) {
      const data = yield  response.json()
      console.log("JSON RESPONSE:\n",data)
      yield put(actions.completeFetchProfile(data)) 
      
    }else{
      const { non_field_errors } = yield response.json()
      yield put(actions.failFetchProfile(non_field_errors[0]))
    }
  }catch(error) {
    yield put(actions.failFetchProfile('Connection failed!'))
  }
}

export function* watchFetchProfile(){
  yield takeEvery(
    types.GET_USER_PROFILE_STARTED,
    fetchProfile,
  )
}