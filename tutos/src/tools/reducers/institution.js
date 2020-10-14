import { combineReducers } from 'redux'
import * as types from '../types/institution'

const institutions = (state = [] , action ) => {
  switch (action.type) {
    case types.FINISH_FETCH_INSTITUTIONS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.START_FETCH_INSTITUTIONS: {
      return true
    }
    default: {
      return false
    }
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case types.FAIL_FETCH_INSTITUTIONS: {
      return action.payload
    }
    default: {
      return null
    }
  }
}

export default combineReducers({
  institutions,
  isFetching,
  error
})

export const getInstitutions = (state) => state.institutions;
export const getInstitutionsIsFetching = (state) => state.isFetching;
export const getInstitutionsError = (state) => state.error;