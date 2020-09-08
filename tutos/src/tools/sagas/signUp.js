import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  select,
} from 'redux-saga/effects';

import { API_BASE_URL }  from '../../settings';

import * as selectors from '../reducers';
import * as types from '../types/signUp';
import * as actions from '../actions/signUp';
import * as authActions from '../actions/auth';
import * as http from '../utils/http'


function* signUp (action) {
  try{
    const {user, userDetail, tutor} = action.payload
    const response = yield call(
      fetch,
      `${API_BASE_URL}/users/create_user/`,
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
          'Content-type': 'application/json'
        },
      },
    );
    const result = yield response.json();
    const userId = result.id;
    console.log(userId)
    const detail = {
        ...userDetail,
        user_id:userId,
    }
    console.log(detail)
    const tutorInfo={
        ...tutor,
        user_id:userId,
    }
    const detailResponse = true
    // yield call(
    //     fetch,
    //     `${API_BASE_URL}/userdetails/`,
    //     {
    //         method: 'POST',
    //         body: JSON.stringify(detail),
    //         headers:{
    //             'Content-Type': 'application/json',
    //         },
    //     },
    // );

    const tutorResponse = true
    // yield call(
    //     fetch,
    //     `${API_BASE_URL}/tutores/`,
    //     {
    //         method: 'POST',
    //         body: JSON.stringify(tutorInfo),
    //         headers:{
    //             'Content-Type': 'application/json',
    //         },
    //     },
    // );

    if(http.isSuccessful(response.status)&&http.isSuccessful(detailResponse.status)&&http.isSuccessful(tutorResponse.status)){
      const username = action.payload.username;
      const password = action.payload.password;
      yield put(actions.completeSignUp());
      yield put(authActions.startLogin(username, password));
    } else if(http.isSuccessful(response.status)&& !http.isSuccessful(detailResponse.status)&&http.isSuccessful(tutorResponse.status)){
      const { non_field_errors } = yield detailResponse.json();
      yield put(actions.failSignUp(non_field_errors[0]));
    } else if(http.isSuccessful(response.status)&& http.isSuccessful(detailResponse.status)&& !http.isSuccessful(tutorResponse.status)){
      const { non_field_errors } = yield tutorResponse.json();
      yield put(actions.failSignUp(non_field_errors[0]));
    } else {
      const { non_field_errors } = yield response.json();
      yield put(actions.failSignUp(non_field_errors[0]));
    }
  }catch(error){
    yield put(actions.failSignUp('Connection failed!'));
  }
};


export function* watchSignUpStarted(){
  yield takeEvery(
      types.SIGN_UP_STARTED,
      signUp,
  )
}