import {
  ADD_ALERT_NOTIFICATION,
  ADD_ERROR_NOTIFICATION,
  CLEAR_NOTIFICATION
} from './actionTypes';
import {Store} from '@ngrx/store';
import {Injectable} from 'angular2/core';

@Injectable()
export class NotificationActions {
  constructor(private store: Store<any>) {}

  addAlert(message) {
    this.store.dispatch({type: ADD_ALERT_NOTIFICATION, payload: message});
  }

  addError(message) {
    this.store.dispatch({type: ADD_ERROR_NOTIFICATION, payload: message});
  }

  clearNotification(id: string) {
    this.store.dispatch({type: CLEAR_NOTIFICATION, payload: id});
  }
}
