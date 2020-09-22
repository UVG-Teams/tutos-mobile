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

export const startEditProfile = (profile) => ({
    type : types.EDIT_PROFILE_STARTED,
    payload : profile
})
export const completeEditProfile = () => ({
    type : types.EDIT_PROFILE_COMPLETED,
    payload : {}
})
export const failEditProfile = (error) => ({
    type : types.EDIT_PROFILE_FAILED,
    payload: error    
})