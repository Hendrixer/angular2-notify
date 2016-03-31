import {Reducer, Action} from '@ngrx/store';
import { Notification } from '../interfaces/notification.interface';
import {
  ADD_ALERT_NOTIFICATION,
  ADD_ERROR_NOTIFICATION,
  CLEAR_NOTIFICATION
} from '../actions/actionTypes';

const genId = ():string => {
   return Math.random().toString(36).slice(-10);
};

const createNotification = (state, {type, message}):Notification[] => {
  const id = genId();
  return [{
    id,
    type,
    message
  }, ...state];
};


export const showupReducer: Reducer<Array<Notification>> = (state: Notification[] = [], action: Action) => {
  switch (action.type) {
    case ADD_ALERT_NOTIFICATION:
      return createNotification(state, {type: 'alert', message: action.payload});

    case ADD_ERROR_NOTIFICATION:
      return createNotification(state, {type: 'error', message: action.payload});

    case CLEAR_NOTIFICATION:
      return state.filter(noti => noti.id !== action.payload);

    default:
      return state;
  }
};
