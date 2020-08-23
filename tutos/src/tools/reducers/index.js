import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth, * as authSelectors from './auth';
import tutorias, * as tutoriasSelectors from './tutorias';
import profile, * as profileSelectors from './profile';

const reducer = combineReducers({
    auth,
    tutorias,
    profile,
    form: formReducer,
})

export default reducer


export const getToken = state => authSelectors.getToken(state.auth)
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth)
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth)
export const isAuthenticated = state => getToken(state) != null
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth)
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth)
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth)
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth)
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth)


export const getTutoria = (state, id) => tutoriasSelectors.getTutoria(state.tutorias , id)
export const getTutorias = (state) => tutoriasSelectors.getTutorias(state.tutorias )
export const isFetchingTutorias = (state) => tutoriasSelectors.isFetchingTutorias(state.tutorias )
export const getTutoriaError = (state) => tutoriasSelectors.getTutoriaError(state.tutorias )

export const getProfile = (state, id) => profileSelectors.getProfile(state.profile)
export const isFetchingProfile = (state) => profileSelectors.isFetchingProfile(state.profile )
export const getProfileError = (state) => profileSelectors.getProfileError(state.profile )
