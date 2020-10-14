import {
  call,
  takeEvery,
  select,
  put,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as types from '../types/careers';
import * as actions from '../actions/careers';
import * as selectors from '../reducers';
import * as schemas from '../schemas/careers';
import * as http from '../utils/http';
import {
  API_BASE_URL,
} from '../../settings';

function* fetchCareers(action){
  try{
    const response = yield call(
      fetch,
      `${API_BASE_URL}/careers`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    if (http.isSuccessful(response.status)){
      const jsonResult = yield response.json();
      yield put (actions.finishFetchCareers(jsonResult))
    } else {
      const { non_field_errors } = yield response.json;
      yield put(actions.failFetchCareers(non_field_errors[0]));
    }
  } catch(error) {
    yield put(actions.failFetchCareers('Network error!'))
  }
}

export function* watchFetchCareers() {
  yield takeEvery(
    types.START_FETCH_CARREERS,
    fetchCareers,
  )
}
