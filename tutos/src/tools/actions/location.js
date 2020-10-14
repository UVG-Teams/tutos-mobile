import * as types from '../types/location'

export const startFetchLocations = () => ({
  type: types.START_FETCH_LOCATIONS,
  payload: {},
})
export const finishFetchLocations = (data) => ({
  type: types.FINISH_FETCH_LOCATIONS,
  payload: data
})
export const failFetchLocations = (error) => ({
  type: types.FAIL_FETCH_LOCATIONS,
  payload: error
})
