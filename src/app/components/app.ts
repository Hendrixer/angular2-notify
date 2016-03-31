import {Component} from 'angular2/core';
import {Notifications} from './notification';


@Component({
  selector: 'app',
  directives: [Notifications],
  template: `
    <div class="app">
      <hx-notify
        [removeDelay]="notificationRemoveDelay"
        (onRemove)="onRemove($event)">
      </hx-notify>
    </div>
  `
})
export class App {
  notificationRemoveDelay:number = 8000;
  
  onRemove(notification) {
    console.log('Remove', notification);
  }
}
