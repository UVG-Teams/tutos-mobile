import {
  call,
  takeEvery,
  select,
  put,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as types from '../types/institution';
import * as actions from '../actions/institution';
import * as schemas from '../schemas/institution';
import * as http from '../utils/http';
import {
  API_BASE_URL,
} from '../../settings';

function* fetchInstitutions(action) {
  try {
    const response = yield call(
      fetch,
      `${API_BASE_URL}/institutions`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    if (http.isSuccessful(response.status)) {
      const jsonResult = yield response.json();
      yield put(actions.finishFetchInstitutions(jsonResult))
    } else {
      const { non_field_errors } = yield response.json;
      yield put(actions.failFetchInstitutions(non_field_errors[0]));
    }
  } catch (error) {
    yield put(actions.failFetchInstitutions('Network error!'))
  }
}

export function* watchFetchInstitution() {
  yield takeEvery(
    types.START_FETCH_INSTITUTIONS,
    fetchInstitutions,
  )
}
