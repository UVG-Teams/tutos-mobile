import { combineReducers } from 'redux'

import * as types from '../types/selects'

const selectedDay = (state = null, action) => {
    switch (action.type) {
        case types.DAY_SELECTED: {
            return action.payload
        }
        default: {
            return state
        }
    }
}


export default combineReducers({
    selectedDay,
})


export const getSelectedDay = state => state.selectedDay
