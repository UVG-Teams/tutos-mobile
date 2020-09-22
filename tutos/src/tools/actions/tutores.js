import * as types from '../types/tutores';


export const startFetchingTutores = () => ({
  type: types.FETCH_TUTORES_STARTED,
});

export const completeFetchingTutores = (entities, order) => ({
  type: types.FETCH_TUTORES_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingTutores = error => ({
  type: types.FETCH_TUTORES_FAILED,
  payload: {
    error,
  },
});