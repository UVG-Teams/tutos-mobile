import{
    call,
    takeEvery,
    select,
    put,
}from 'redux-saga/effects';
import {normalize} from 'normalizr';

import * as types from '../types/users';
import * as actions from '../actions/users';
import * as selectors from '../reducers';
import * as schemas from '../schemas/users';
import * as http from '../utils/http';
import{
    API_BASE_URL,
}from '../../settings';

function* fetchUser(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/userdetails/`,
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
                    entities:{users},
                    result,
                } = normalize(jsonResult, schemas.users);
                yield put(actions.completeFetchingUsers(users, result));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failFetchingUsers(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failFetchingUsers('Connection failed!'))
    }
}
export function* watchFetchUsers(){
    yield takeEvery(
        types.FETCH_USERS_STARTED,
        fetchUser,
    )
}

