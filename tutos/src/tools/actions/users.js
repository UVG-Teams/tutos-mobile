import * as types from '../types/users';


export const startFetchingUsers = () => ({
  type: types.FETCH_USERS_STARTED,
});

export const completeFetchingUsers = (entities, order) => ({
  type: types.FETCH_USERS_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingUsers = error => ({
  type: types.FETCH_USERS_FAILED,
  payload: {
    error,
  },
});

export const startAddingUser = (userId, user) => ({
  type: types.ADD_USER_STARTED,
  payload: {
    userId,
    user,
  }
});

export const completeAddingUser = (tempId, user) => ({
  type: types.ADD_USER_COMPLETED,
  payload: {
    tempId,
    user,
  },
});

export const failAddingUser = (tempId, error) => ({
  type: types.ADD_USER_FAILED,
  payload: {
    tempId,
    error,
  },
});

export const startRemovingUser = id => ({
    type: types.REMOVE_USER_STARTED,
    payload: {
      id,
    },
});

export const completeRemovingUser = () => ({
  type: types.REMOVE_USER_COMPLETED,
});

export const failRemovingUser = (id, error) => ({
    type: types.REMOVE_USER_FAILED,
    payload: {
      id,
      error,
    },
});