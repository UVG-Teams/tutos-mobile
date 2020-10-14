import { combineReducers } from 'redux'
import * as types from '../types/careers'

const careers = (state = [], action) => {
  switch (action.type) {
    case types.FINISH_FETCH_CARREERS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

const isFetching = (state = false , action ) => {
  switch(action.type) {
    case types.START_FETCH_CARREERS: {
      return true
    }
    default: {
      return false
    }
  }
}

const error = (state = null , action) => {
  switch (action.type) {
    case types.FAIL_FETCH_CARREERS: {
      return action.payload
    }
    default: {
      return null
    }
  }
}

export default combineReducers ({
  careers,
  isFetching,
  error
})

export const getCareers = (state) => state.careers;
export const getCareersIsFetching = (state) => state.isFetching;
export const getCareersError = (state) => state.error;