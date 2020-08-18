import * as types from '../types/tutorias.js'

export const startChangeTutoriaStatus = (tutoriaid) => ({
    type : types.CHANGE_TUTORIA_STATUS_STARTED ,
    payload: {
        tutoriaid 
    }
})
export const completeChangeTutoriaStatus = (entities, order) => ({
    type : types.CHANGE_TUTORIA_STATUS_COMPLETED ,
    payload: {
        entities,
        order
    }
})
export const failChangeTutoriaStatus = error => ({
    type : types.CHANGE_TUTORIA_STATUS_FAILED ,
    payload: {
        error
    }
})

export const startGetTutorias  = (/*tutorid = 1*/) => ({
  type : types.GET_TUTORIAS_STARTED,
//   payload : {
//     tutorid: tutorid,
//   },
})

export const completeGetTutorias = (entities, order) => ({
  type : types.GET_TUTORIAS_COMPLETED,
  payload : {
      entities,
      order
  } 
})

export const failGetTutorias = error => ({
  type : types.GET_TUTORIAS_FAILED,
  payload : {error}
})

export const startAddTutoria = (tutoria) => ({
    type : types.ADD_TUTORIA_STARTED,
    payload: tutoria
})
export const completeAddTutoria = (tempid ,  tutoria) => ({
    type : types.ADD_TUTORIA_COMPLETED,
    payload: {
        tempid,
        tutoria
    }
})
export const failAddTutoria = (tempid , error) => ({
    type : types.ADD_TUTORIA_FAILED,
    payload: {
        tempid, 
        error
    }
})

export const startDeleteTutoria = (id ) => ({
    type : types.DELETE_TUTORIA_STARTED ,
    payload: {
        id
    }
})
export const completeDeleteTutoria = () => ({
    type : types.DELETE_TUTORIA_COMPLETED ,
})
export const failDeleteTutoria = (id, error) => ({
    type : types.DELETE_TUTORIA_FAILED ,
    payload: {
        id,
        error
    }
})