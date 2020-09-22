import{
    call,
    takeEvery,
    select,
    put,
}from 'redux-saga/effects';
import {normalize} from 'normalizr';

import * as types from '../types/tutores';
import * as actions from '../actions/tutores';
import * as selectors from '../reducers';
import * as schemas from '../schemas/tutores';
import * as http from '../utils/http';
import{
    API_BASE_URL,
}from '../../settings';

function* fetchTutor(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tutores/`,
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
                    entities:{tutores},
                    result,
                } = normalize(jsonResult, schemas.tutores);
                yield put(actions.completeFetchingTutores(tutores, result));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failFetchingTutores(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failFetchingTutores('Connection failed!'))
    }
}
export function* watchFetchTutores(){
    yield takeEvery(
        types.FETCH_TUTORES_STARTED,
        fetchTutor,
    )
}