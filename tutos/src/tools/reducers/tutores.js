import omit from 'lodash/omit'; 
import { combineReducers } from 'redux';

import * as types from '../types/tutores';
import actions from 'redux-form/lib/actions';

const byId = (state = {}, action) =>{
    switch(action.type){
        case types.FETCH_TUTORES_COMPLETED: {
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
        case types.FETCH_TUTORES_COMPLETED: {
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
        case types.FETCH_TUTORES_STARTED: {
            return true;
        }
        case types.FETCH_TUTORES_COMPLETED: {
            return false;
        }
        case types.FETCH_TUTORES_FAILED: {
            return false;
        }
        default:{
            return state;
        }
    }
};
const error = (state = null, action) =>{
    switch(action.type){
        case types.FETCH_TUTORES_STARTED:
        case types.FETCH_TUTORES_COMPLETED:
            return null;
        case types.FETCH_TUTORES_FAILED:
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

export const getTutor = (state, id) => state.byId[id];
export const getTutores = state => state.order.map(id => getTutor(state, id));
export const isFetchingTutores = state => state.isFetching;
export const getTutorError = state => state.error;