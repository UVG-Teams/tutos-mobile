import * as types from '../types/tutorProfile'
import { combineReducers } from 'redux';

const isFetching = (state = false , action) => {
  if (action.type === types.GET_TUTOR_PROFILE_STARTED){
    return true;
  }
  return false;
}

const profile = (state = {} , action) => {
  if (action.type === types.GET_TUTOR_PROFILE_COMPLETED){
    return action.payload;
  }
  return state;
}

const tutorProfile = combineReducers({
  profile,
  isFetching
})

export default tutorProfile;

export const getTutorProfie = state => state.profile;
export const isFetchingTutorProfile = state => state.isFetching;
