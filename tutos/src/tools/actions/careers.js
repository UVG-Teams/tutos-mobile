import * as types from '../types/careers'

export const startFetchCareers = () => ({
  type : types.START_FETCH_CARREERS,
  payload: {},
})
export const finishFetchCareers = (data) => ({
  type : types.FINISH_FETCH_CARREERS,
  payload: data,
})
export const failFetchCareers = (error) => ({
  type : types.FAIL_FETCH_CARREERS,
  payload: error
})