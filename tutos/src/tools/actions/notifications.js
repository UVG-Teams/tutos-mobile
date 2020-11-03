import * as types from '../types/notifications.js'

export const startGetNotifications  = (/*tutorid = 1*/) => ({
    type : types.GET_NOTIFICATIONS_STARTED,
  //   payload : {
  //     tutorid: tutorid,
  //   },
  })
  
  export const completeGetNotifications = (entities, order) => ({
    type : types.GET_NOTIFICATIONS_COMPLETED,
    payload : {
        entities,
        order
    } 
  })
  
  export const failGetNotifications = error => ({
    type : types.GET_NOTIFICATIONS_FAILED,
    payload : {error}
  })
  
  export const startAddNotification = (notification) => ({
      type : types.ADD_NOTIFICATION_STARTED,
      payload: notification
  })
  export const completeAddNotification = (tempid ,  notification) => ({
      type : types.ADD_NOTIFICATION_COMPLETED,
      payload: {
          tempid,
          notification
      }
  })
  export const failAddNotification = (tempid , error) => ({
      type : types.ADD_NOTIFICATION_FAILED,
      payload: {
          tempid, 
          error
      }
  })
  
  export const startDeleteNotification = (id ) => ({
      type : types.DELETE_NOTIFICATION_STARTED ,
      payload: {
          id
      }
  })
  export const completeDeleteNotification = () => ({
      type : types.DELETE_NOTIFICATION_COMPLETED ,
  })
  export const failDeleteNotification = (id, error) => ({
      type : types.DELETE_NOTIFICATION_FAILED ,
      payload: {
          id,
          error
      }
  })