import * as types from '../types/profile'
import { combineReducers } from 'redux';
import omit from 'lodash/omit'


const profileData = (state = {} , action) => {
  switch (action.type){
    case types.GET_PROFILE_STARTED: {
        return {}
    }
    case types.GET_PROFILE_COMPLETED: {
        return action.payload  
    }
    case types.GET_PROFILE_FAILED: {
        return {}
    }
    default: {
        return state
    }
  }
}


const isFetching = (state = false, action) => {
    switch(action.type){
        case types.GET_PROFILE_STARTED: {
            return true
        }
        case types.GET_PROFILE_COMPLETED:{
            return false
        }   
        case types.GET_PROFILE_FAILED:{
            return false
        }
        default : {return state}
    }
}

const isUpdating = (state = false, action) => {
    switch (action.type) {
        case types.EDIT_PROFILE_STARTED: {
            return true
        }
        case types.EDIT_PROFILE_COMPLETED: {
            return false
        }
        case types.EDIT_PROFILE_FAILED: {
            return false
        }
        default: { return state }
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case types.GET_PROFILE_STARTED : {
            return null
        }
        case types.GET_PROFILE_COMPLETED : {
            return null
        }
        case types.GET_PROFILE_FAILED : {
            return action.payload
        }
        default: {
            return state
        }
    }
}

const profileReducer = combineReducers({
  profileData,
  isFetching,
  isUpdating,
  error,
})

export default profileReducer;

export const getProfile = state =>  state.profileData
export const isFetchingProfile = state => state.isFetching;
export const getProfileError = state => state.error
export const getIsUpdating = state => state.isUpdating;