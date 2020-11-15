import * as types from '../types/events'
import { combineReducers } from 'redux';
import omit from 'lodash/omit'
import dayjs from 'dayjs'

const byid = (state = {} , action) => {
    switch(action.type){
        case types.GET_EVENTS_COMPLETED :{
            const newState = {};
            const { entities, order } = action.payload;
            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                    isConfirmed: true
                }
            })
            return newState
        }
        case types.ADD_EVENT_STARTED :{
            const newState = {...state}
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed : false
            }
            return newState
        }
        case types.ADD_EVENT_COMPLETED:{
            const {tempid, event } = action.payload
            const newState = omit(state, tempid)
            newState[event.id] = {
                ...event,
                isConfirmed : true,
            }
            return newState
        }
        case types.DELETE_EVENT_STARTED:{
            return omit(state,action.payload.id)
        }
        default :{
            return state
        }
    }
}

const order = (state = [] , action) => {
  switch (action.type){
    case types.GET_EVENTS_COMPLETED: {
        return [
            ...action.payload.order
        ]
    }
    case types.ADD_EVENT_STARTED: {
        return [
            ...state, 
            action.payload.id
        ]
    }
    case types.ADD_EVENT_COMPLETED: {
        const { tempid, event } = action.payload
        return state.map(id => id === tempid ? event.id : id)
    }
    case types.DELETE_EVENT_STARTED: {
        const { id } = action.payload
        return state.filter(value => value !== id)
    }
    default :{
      return state
    }
  }
}


const isFetching = (state = false, action) => {
    switch(action.type){
        case types.GET_EVENTS_STARTED: {
            return true
        }
        case types.GET_EVENTS_COMPLETED:{
            return false
        }   
        case types.GET_EVENTS_FAILED:{
            return false
        }
        default : {return state}
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case types.GET_EVENTS_STARTED : {
            return null
        }
        case types.GET_EVENTS_COMPLETED : {
            return null
        }
        case types.GET_EVENTS_FAILED : {
            return action.payload.error
        }
        case types.ADD_EVENT_STARTED: {
            return null
        }
        case types.ADD_EVENT_COMPLETED: {
            return null
        }
        case types.ADD_EVENT_FAILED : {
            return action.payload.error
        }
        case types.DELETE_EVENT_STARTED: {
            return null
        }
        case types.DELETE_EVENT_COMPLETED: {
            return null
        }
        case types.DELETE_EVENT_FAILED : {
            return action.payload.error
        }
        default: {
            return state
        }
    }
}

const dashboardEvent = combineReducers({
  byid,
  order,
  isFetching,
  error,
})

export default dashboardEvent;

export const getEvent = (state, id) =>  state.byid[id];
export const getEvents = state => state.order.map(id => getEvent(state, id));
export const isFetchingEvents = (state) => state.isFetching;
export const getEventError = (state) => state.error;
export const getEventsOnDate = (state, datetime) => getEvents(state).filter(event => dayjs(event.date).format('YYYY-MM-DD') == datetime)
