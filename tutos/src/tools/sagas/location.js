import {
  call,
  takeEvery,
  select,
  put,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as types from '../types/location';
import * as actions from '../actions/location';
import * as schemas from '../schemas/location';
import * as http from '../utils/http';
import {
  API_BASE_URL,
} from '../../settings';

function* fetchLocations(action) {
  try {
    const response = yield call(
      fetch,
      `${API_BASE_URL}/locations`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    if (http.isSuccessful(response.status)) {
      const jsonResult = yield response.json();
      yield put(actions.finishFetchLocations(jsonResult))
    } else {
      const { non_field_errors } = yield response.json;
      yield put(actions.failFetchLocations(non_field_errors[0]));
    }
  } catch (error) {
    yield put(actions.failFetchLocations('Network error!'))
  }
}

export function* watchFetchLocation() {
  yield takeEvery(
    types.START_FETCH_LOCATIONS,
    fetchLocations,
  )
}
