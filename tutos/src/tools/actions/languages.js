import * as types from '../types/languages';

export const startFetchLanguage = () => ({
  type : types.FETCH_LANGUAGES_STARTED,
  payload: {},
});

export const finishFetchLanguage = (languages) => ({
  type : types.FETCH_LANGUAGES_FINISHED,
  payload: languages,
});

export const failFetchLanguage = (error) => ({
  type : types.FETCH_LANGUAGES_FAILED,
  payload: error,
});
