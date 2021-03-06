import { Router } from "./libs/vaadin-router.js";
import './shoppinglist/boundary/Items.js';
import './shoppinglist/boundary/List.js';
import './shoppinglist/boundary/ListAcquired.js';
import './status/boundary/Status.js';
import store from "./store.js";
import { save } from "./localstorage/control/StorageControl.js";

store.subscribe(_ => {
  const state = store.getState();
  save(state);
});

const outlet = document.querySelector('.view');
const router = new Router(outlet);
router.setRoutes([
  { path: '/', component: 'wc-item-list' },
  { path: '/add', component: 'wc-items' },
  { path: '/acquired', component: 'wc-item-list-acquired' },
  { path: '(.*)', component: 'wc-item-list' } // default
]);
console.log("router initialized");