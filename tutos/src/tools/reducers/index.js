import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth, * as authSelectors from './auth';
import selects, * as selectsSelectors from './selects';
import tutorias, * as tutoriasSelectors from './tutorias';
import profile, * as profileSelectors from './profile';
import users, * as usersSelectors from './users';
import signUp, * as signUpSelectors from './signUp';
import tutorProfile , * as tutorProfileSelectors from './tutorProfile';
import tutores, * as tutoresSelectors from './tutores';
import languages , * as languagesSelectors from './languages'

const reducer = combineReducers({
    auth,
    selects,
    signUp,
    tutorias,
    profile,
    users,
    tutores,
    tutorProfile,
    languages,
    form: formReducer,
})

export default reducer


export const getToken = state => authSelectors.getToken(state.auth)
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth)
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth)
export const isAuthenticated = state => getToken(state) !== null
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth)
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth)
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth)
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth)
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth)

export const getSelectedDay = state => selectsSelectors.getSelectedDay(state.selects)

export const getIsSigningUp = state => signUpSelectors.getIsSigningUp(state.signUp)
export const getSignUpError = state => signUpSelectors.getSignUpError(state.signUp)

export const getUser = (state, id) => usersSelectors.getUser(state.users, id);
export const getUsers = state => usersSelectors.getUsers(state.users);
export const isFetchingUsers = state => usersSelectors.isFetchingUsers(state.users);
export const getUserError = state => usersSelectors.getUserError(state.users);

export const getTutorProfile = (state) => tutorProfileSelectors.getTutorProfie(state.tutorProfile)
export const isFetchingTutorProfile = (state) => tutorProfileSelectors.isFetchingTutorProfile(state.tutorProfile)
export const isUpdatingTutorProfile = state => tutorProfileSelectors.isUpdatingTutorProfile(state.tutorProfile)

export const getTutoria = (state, id) => tutoriasSelectors.getTutoria(state.tutorias , id)
export const getTutorias = state => tutoriasSelectors.getTutorias(state.tutorias)
export const isFetchingTutorias = state => tutoriasSelectors.isFetchingTutorias(state.tutorias)
export const getTutoriaError = state => tutoriasSelectors.getTutoriaError(state.tutorias)
export const getTutoriasOnDate = (state, date) => tutoriasSelectors.getTutoriasOnDate(state.tutorias, date)

export const getProfile = state => profileSelectors.getProfile(state.profile)
export const isFetchingProfile = state => profileSelectors.isFetchingProfile(state.profile)
export const getProfileError = state => profileSelectors.getProfileError(state.profile)
export const getIsUpdatingProfile = (state) => profileSelectors.getIsUpdating(state.profile)

export const getTutor = (state, id) => tutoresSelectors.getTutor(state.tutores, id);
export const getTutores = state => tutoresSelectors.getTutores(state.tutores);
export const isFetchingTutores = state => tutoresSelectors.isFetchingTutores(state.tutores);
export const getTutorError = state => tutoresSelectors.getTutorError(state.tutores);

export const getLanguages = (state) => languagesSelectors.getLanguages(state.languages);
export const getLanguagesById = (state , index) => languagesSelectors.getLanguages(state , index);
export const getIsFetchingLanguages = (state) => languagesSelectors.getIsFetchingLanguages(state.languages);
export const getError = (state) => languagesSelectors.getError(state.languages);

