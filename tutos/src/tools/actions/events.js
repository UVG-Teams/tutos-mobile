import * as types from '../types/events.js'
export const startGetEvents  = () => ({
    type : types.GET_EVENTS_STARTED,
})
  
export const completeGetEvents = (entities, order) => ({
    type : types.GET_EVENTS_COMPLETED,
    payload : {
        entities,
        order
    } 
})
  
export const failGetEvents = error => ({
    type : types.GET_EVENTS_FAILED,
    payload : {error}
})
  
export const startAddEvent = (event) => ({
      type : types.ADD_EVENT_STARTED,
      payload: event
})
export const completeAddEvent = (tempid ,  event) => ({
    type : types.ADD_EVENT_COMPLETED,
    payload: {
        tempid,
        event
    }
})
export const failAddEvent = (tempid , error) => ({
    type : types.ADD_EVENT_FAILED,
    payload: {
        tempid, 
        error
    }
})
  
export const startDeleteEvent = (id ) => ({
    type : types.DELETE_EVENT_STARTED ,
    payload: {
        id
    }
})
export const completeDeleteEvent = () => ({
      type : types.DELETE_EVENT_COMPLETED ,
})
export const failDeleteEvent = (id, error) => ({
    type : types.DELETE_EVENT_FAILED ,
    payload: {
        id,
        error
    }
})