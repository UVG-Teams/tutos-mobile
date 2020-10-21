import * as types from '../types/notifications'
import { combineReducers } from 'redux';
import omit from 'lodash/omit'

const byid = (state = {} , action) => {
    switch(action.type){
        case types.GET_NOTIFICATIONS_COMPLETED :{
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
        // case types.ADD_NOTIFICATION_STARTED :{
        //     const newState = {...state}
        //     newState[action.payload.id] = {
        //         ...action.payload,
        //         isConfirmed : false
        //     }
        //     return newState
        // }
        // case types.ADD_NOTIFICATION_COMPLETED:{
        //     const {tempid, notification } = action.payload
        //     const newState = omit(state, tempid)
        //     newState[notification.id] = {
        //         ...notification,
        //         isConfirmed : true,
        //     }
        //     return newState
        // }
        case types.DELETE_NOTIFICATION_STARTED:{
            return omit(state,action.payload.id)
        }
        default :{
            return state
        }
    }
}

const order = (state = [] , action) => {
  switch (action.type){
    case types.GET_NOTIFICATIONS_COMPLETED: {
        return [
            ...action.payload.order
        ]
    }
    // case types.ADD_NOTIFICATION_STARTED: {
    //     return [
    //         ...state, 
    //         ...action.payload.notification.id
    //     ]
    // }
    // case types.ADD_NOTIFICATION_COMPLETED: {
    //     const { tempid, notification } = action.payload
    //     return state.map(id => id === tempid ? notification.id : id)
    // }
    case types.DELETE_NOTIFICATION_STARTED: {
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
        case types.GET_NOTIFICATIONS_STARTED: {
            return true
        }
        case types.GET_NOTIFICATIONS_COMPLETED:{
            return false
        }   
        case types.GET_NOTIFICATIONS_FAILED:{
            return false
        }
        default : {return state}
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case types.GET_NOTIFICATIONS_STARTED : {
            return null
        }
        case types.GET_NOTIFICATIONS_COMPLETED : {
            return null
        }
        case types.GET_NOTIFICATIONS_FAILED : {
            return action.payload.error
        }
        // case types.ADD_NOTIFICATION_STARTED: {
        //     return null
        // }
        // case types.ADD_NOTIFICATION_COMPLETED: {
        //     return null
        // }
        // case types.ADD_NOTIFICATION_FAILED : {
        //     return action.payload.error
        // }
        case types.DELETE_NOTIFICATION_STARTED: {
            return null
        }
        case types.DELETE_NOTIFICATION_COMPLETED: {
            return null
        }
        case types.DELETE_NOTIFICATION_FAILED : {
            return action.payload.error
        }
        default: {
            return state
        }
    }
}

const dashboardNotification = combineReducers({
  byid,
  order,
  isFetching,
  error,
})

export default dashboardNotification;

export const getNotification = (state, id) =>  state.byid[id];
export const getNotifications = state => state.order.map(id => getNotification(state, id));
export const isFetchingNotifications = (state) => state.isFetching;
export const getNotificationError = (state) => state.error;
