import { combineReducers } from 'redux'
import find from 'lodash/find'
import * as types from '../types/languages'

const languages = (state=[] , action) => {
  switch (action.type){
    case types.FETCH_LANGUAGES_FINISHED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

const isFetchingLanguages = (state = false , action) => {
  switch (action.type) {
    case types.FETCH_LANGUAGES_STARTED: {
      return true;
    }
    default: {
      return false;
    }
  }
}

const error = (state = null , action) => {
  switch (action.type) {
    case types.FETCH_LANGUAGES_STARTED:
    case types.FETCH_LANGUAGES_COMPLETED:
      return null;
    case types.FETCH_LANGUAGES_FAILED:
      return action.payload
    default: {
      return state;
    }
  }
}

export default combineReducers({
  languages,
  isFetchingLanguages,
  error,
})

export const getLanguages = (state) => state.languages;
export const getLanguagesById = (state , id) => find(state.languages , (element) => element.id === id);
export const getIsFetchingLanguages = (state) => state.isFetchingLanguages;
export const getError = (state) => state.error;
