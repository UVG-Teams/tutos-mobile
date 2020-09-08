import omit from 'lodash/omit'; 
import { combineReducers } from 'redux';

import * as types from '../types/users';
import actions from 'redux-form/lib/actions';

const byId = (state = {}, action) =>{
    switch(action.type){
        case types.FETCH_USERS_COMPLETED: {
            const newState = {};
            const {entities, order} = action.payload;
            order.forEach(id => {
                newState[id] ={
                    ...entities[id],
                    isConfirmed: true,
                }
            });
            return newState;
        }
        default:{
            return state;
        } 
    }
};
const order = (state = [], action) =>{
    switch(action.type){
        case types.FETCH_USERS_COMPLETED: {
            return [ 
                ...action.payload.order
            ];
        }
        default:{
            return state;
        } 
    }
};
const isFetching = (state = false, action) =>{
    switch(action.type){
        case types.FETCH_USERS_STARTED: {
            return true;
        }
        case types.FETCH_USERS_COMPLETED: {
            return false;
        }
        case types.FETCH_USERS_FAILED: {
            return false;
        }
        default:{
            return state;
        }
    }
};
const error = (state = null, action) =>{
    switch(action.type){
        case types.FETCH_USERS_STARTED:
        case types.FETCH_USERS_COMPLETED:
            return null;
        case types.FETCH_USERS_FAILED:
            return action.payload.error
        default:{
            return state;
        }
    }
};

export default combineReducers({
    byId,
    order,
    isFetching,
    error,
})

export const getUser = (state, id) => state.byId[id];
export const getUsers = state => state.order.map(id => getUser(state, id));
export const isFetchingUsers = state => state.isFetching;
export const getUserError = state => state.error;
