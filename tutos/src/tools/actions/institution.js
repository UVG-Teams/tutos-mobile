import * as types from '../types/institution'

export const startFetchInstitutions = () => ({
  type: types.START_FETCH_INSTITUTIONS,
  payload: {},
})
export const finishFetchInstitutions = (data) => ({
  type: types.FINISH_FETCH_INSTITUTIONS,
  payload: data
})
export const failFetchInstitutions = (error) => ({
  type: types.FAIL_FETCH_INSTITUTIONS,
  payload: error
})
