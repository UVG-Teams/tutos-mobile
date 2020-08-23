import { combineReducers } from 'redux'
import * as types from '../types/profile'

const profile = (state = {} , action) => {
  switch(action.type){
    case types.GET_USER_PROFILE_STARTED: {
      return {};
    }
    case types.GET_USER_PROFILE_COMPLETED: {
      return action.payload;
    }
    case types.GET_USER_PROFILE_FAILED: {
      return {};
    }
  }
  return state;
}

const isFetching = (state = false , action) => {
  switch(action.type){
    case types.GET_USER_PROFILE_STARTED: {
      return true;
    }
    default:{
      return false
    }
  }
}

const error = (state = null ,  action)=> {
  switch(action.type){
      case types.GET_USER_PROFILE_FAILED: {
        return action.payload.error;
      }
      default: {return null}
  }
}

export default combineReducers({
  profile,
  isFetching,
  error
});

export const getProfile = state => state.profile.profile; 
export const getIsFetching = state => state.isFetching;
export const getError = state => state.error;