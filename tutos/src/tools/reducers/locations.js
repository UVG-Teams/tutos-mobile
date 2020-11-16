import { combineReducers } from 'redux'
import * as types from '../types/location'

const locations = (state = [], action) => {
    switch (action.type) {
        case types.FINISH_FETCH_LOCATIONS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.START_FETCH_LOCATIONS: {
            return true
        }
        default: {
            return false
        }
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case types.FAIL_FETCH_INSTITUTIONS: {
            return action.payload
        }
        default: {
            return null
        }
    }
}

export default combineReducers({
    locations,
    isFetching,
    error
})

export const getLocations = (state) => state.locations
export const getLocationsIsFetching = (state) => state.isFetching
export const getLocationsError = (state) => state.error
