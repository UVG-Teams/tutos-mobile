import * as types from '../types/tutorias'
import { combineReducers } from 'redux';
import omit from 'lodash/omit'
import dayjs from 'dayjs'

const byid = (state = {} , action) => {
    switch(action.type){
        case types.GET_TUTORIAS_COMPLETED :{
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
        case types.ADD_TUTORIA_STARTED :{
            const newState = {...state}
            newState[action.payload.id] = {
                ...action.payload,
                isConfirmed : false
            }
            return newState
        }
        case types.ADD_TUTORIA_COMPLETED:{
            const {tempid, tutoria } = action.payload
            const newState = omit(state, tempid)
            newState[tutoria.id] = {
                ...tutoria,
                isConfirmed : true,
            }
            return newState
        }
        case types.DELETE_TUTORIAS_STARTED:{
            return omit(state,action.payload.id)
        }
        case types.CHANGE_TUTORIA_STATUS_STARTED : {
            const newState = {...state}
            const { tutoriaid } = action.payload
            newState[tutoriaid].status < 4 ? newState[tutoriaid].status++ : newState[tutoriaid].status = 1
            return newState
        }
        case types.CHANGE_TUTORIA_STATUS_COMPLETED : {
            //TODO ESPERAR A SAGAS
        }
        case types.CHANGE_TUTORIA_STATUS_FAILED : {
            //TODO ESPERAR A SAGAS
        }
        default :{
            return state
        }
    }
}

const order = (state = [] , action) => {
  switch (action.type){
    case types.GET_TUTORIAS_COMPLETED: {
        return [
            ...action.payload.order
        ]
    }
    case types.ADD_TUTORIA_STARTED: {
        return [
            ...state, 
            action.payload.id
        ]
    }
    case types.ADD_TUTORIA_COMPLETED: {
        const { tempid, tutoria } = action.payload
        return state.map(id => id === tempid ? tutoria.id : id)
    }
    case types.DELETE_TUTORIAS_STARTED: {
        const { id } = action.payload
        return state.filter(value => value !== id)
    }
    // case types.DELETE_TUTOS_COMPLETED: {

    // }
    default :{
      return state
    }
  }
}


const isFetching = (state = false, action) => {
    switch(action.type){
        case types.GET_TUTORIAS_STARTED: {
            return true
        }
        case types.GET_TUTORIAS_COMPLETED:{
            return false
        }   
        case types.GET_TUTORIAS_FAILED:{
            return false
        }
        default : {return state}
    }
}

const error = (state = null, action) => {
    switch(action.type){
        case types.GET_TUTORIAS_STARTED : {
            return null
        }
        case types.GET_TUTORIAS_COMPLETED : {
            return null
        }
        case types.GET_TUTORIAS_FAILED : {
            return action.payload.error
        }
        case types.ADD_TUTORIA_STARTED: {
            return null
        }
        case types.ADD_TUTORIA_COMPLETED: {
            return null
        }
        case types.ADD_TUTORIA_FAILED : {
            return action.payload.error
        }

        case types.DELETE_TUTORIAS_STARTED: {
            return null
        }
        case types.DELETE_TUTORIAS_COMPLETED: {
            return null
        }
        case types.DELETE_TUTORIAS_FAILED : {
            return action.payload.error
        }
        default: {
            return state
        }
    }
}

const dashboardTutor = combineReducers({
  byid,
  order,
  isFetching,
  error,
})

export default dashboardTutor;

export const getTutoria = (state, id) =>  state.byid[id]
export const getTutorias = state => state.order.map(id => getTutoria(state, id))
export const isFetchingTutorias = (state) => state.isFetching;
export const getTutoriaError = (state) => state.error
export const getTutoriaStatus = (state, id ) => state.byid[id].status
export const getTutoriasOnDate = (state, date) => getTutorias(state).filter(tutoria => dayjs(tutoria.datetime).format('YYYY-MM-DD') == date)
