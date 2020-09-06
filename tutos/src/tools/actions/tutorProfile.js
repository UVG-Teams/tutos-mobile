import * as types from '../types/tutorProfile'

export const startGetTutorProfile = id => ({
  type : types.GET_TUTOR_PROFILE_STARTED,
  payload: {
    id
  }
})

export const completeGetTutorProflie = tutorProfile => ({
  type : types.GET_TUTOR_PROFILE_COMPLETED,
  payload: tutorProfile
})

export const failGetTutorProfile = error => ({
  type : types.GET_TUTOR_PROFILE_FAILED,
  payload : error
})