import {
  call,
  takeEvery,
  select,
  put,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as types from '../types/languages'
import * as actions from '../actions/languages'
import * as schemas from '../schemas/tutores'
import * as selectors from '../reducers'
import * as http from '../utils/http'

import {
  API_BASE_URL
} from '../../settings'

function* languagesFetcher(action){
  try{
    const response = yield call(
      fetch,
      `${API_BASE_URL}/languages/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      },
    )
    if(http.isSuccessful(response.status)){
      const jsonResult = yield response.json();
      yield put(actions.finishFetchLanguage(jsonResult))
    }
  } catch (error) {
    yield put(actions.failFetchLanguage(error))
  }
}

export function* watchFetchLanguages(){
  yield takeEvery(
    types.FETCH_LANGUAGES_STARTED,
    languagesFetcher
  )
}