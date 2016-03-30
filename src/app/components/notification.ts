import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from 'angular2/core';
import {Store} from '@ngrx/store';
import {NotificationActions} from '../actions/actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';

import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'hx-notify',
  styles: [`
    .notifications {
      position: fixed;
      z-index: 10;
      bottom: 0;
    }
    .notification {
      width: 100%;
      height: 30px;
      border-radius: 3px;
      padding: 15px;
      text-align: center;
      color: white;
      position: relative;
      color: white;
      margin-top: 5px;
    }
    .alert{
      background-color: green;
    }
    .error{
      background-color: red;
    }
    .message {
      font-size: 18px;
    }
  `],
  template: `
    <div class="notifications">
      <div class="notification {{ notification.type }}" *ngFor="#notification of notifications | async ">
        <span class="message">{{ notification.message }}</span>
      </div>
    </div>
  `,
  providers: [NotificationActions]
})
export class Notification implements AfterViewInit {
  @Input() removeDelay: number;
  @Input() location: string;
  @Output() onRemove = new EventEmitter();
  @Output() onAdd = new EventEmitter();
  notifications;
  
  constructor(public store: Store<any>, public actions: NotificationActions) {
    this.notifications = store.select('notifications');
  }
  
  ngAfterViewInit() {
    this.notifications
    .subscribe(notifications => {
      this.autoRemoveNotifications(notifications.map(notification => notification.id));
    })
  }
  
  autoRemoveNotifications(notificationIds: string[] = []) {
    if (!notificationIds.length) {
      return;
    }
    setTimeout(() => {
      notificationIds.forEach(id => this.removeNotification(id));
    }, this.removeDelay);
  }
  
  removeNotification(id:string) {
    this.actions.clearNotification(id);
  }
}
