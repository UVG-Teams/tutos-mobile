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