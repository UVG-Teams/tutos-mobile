import * as types from '../types/profile'
export const startFetchProfile = () => ({
  type : types.GET_USER_PROFILE_STARTED,
  payload:{}
})

export const completeFetchProfile = ({
    phone, 
    gender, 
    birthdate, 
    is_tutor,
    location, 
    institution, 
    career,
    username,
    first_name,
    last_name,
    email,
    is_superuser,
    is_staff,
    is_active,
    language,
    date_joined
  }) => ({
  type : types.GET_USER_PROFILE_COMPLETED,
  payload:{
    phone,
    gender,
    birthdate,
    is_tutor,
    location,
    institution,
    career,
    username,
    first_name,
    last_name,
    email,
    is_superuser,
    is_staff,
    is_active,
    language,
    date_joined
  },
})

export const failFetchProfile = error => ({
  type : types.GET_USER_PROFILE_FAILED,
  payload : {error}
})