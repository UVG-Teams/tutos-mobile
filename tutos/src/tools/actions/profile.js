import * as types from '../types/profile.js'

export const startGetProfile  = () => ({
    type: types.GET_PROFILE_STARTED,
})
  
export const completeGetProfile = profile => ({
    type: types.GET_PROFILE_COMPLETED,
    payload: profile
})

export const failGetProfile = error => ({
    type: types.GET_PROFILE_FAILED,
    payload: error
})