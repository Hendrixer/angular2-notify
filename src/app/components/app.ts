import {Component} from 'angular2/core';
import {Notification} from './notification';


@Component({
  selector: 'app',
  directives: [Notification],
  template: `
    <div class="app">
      <hx-notify
        [removeDelay]="notificationRemoveDelay"
      ></hx-notify>
    </div>
  `
})
export class App {
  notificationRemoveDelay:number = 8000;
}
