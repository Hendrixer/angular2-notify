import {enableProdMode} from "angular2/core";
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {provideStore} from '@ngrx/store';
import {showupReducer} from './reducers/notification';
import { App } from './components/app.ts';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'production') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

document.addEventListener('DOMContentLoaded', () => {
  return bootstrap(App, [
    ...ENV_PROVIDERS,
     provideStore(
       {notifications: showupReducer},
       {notifications: [
         {type: 'error', message: 'This is an error', id: '1'},
         {type: 'alert', message: 'This is a message', id: '2'}
       ]}
     )
  ])
  .catch(err => console.error(err));
});
