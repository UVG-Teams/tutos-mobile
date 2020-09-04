import * as types from '../types/selects'

export const selectDay = day => ({
    type: types.DAY_SELECTED,
    payload: day,
})
