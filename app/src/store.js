import { configureStore } from "./libs/redux-toolkit.esm.js";
import { load } from "./localstorage/control/StorageControl.js";
import { items } from "./shopping/entity/ItemsReducer.js";
import { status } from "./status/entity/StatusReducer.js";

const reducer = {
    items,
    status
}
const preloadedState = load();
const config = preloadedState ? { reducer, preloadedState } : { reducer };
const store = configureStore(config);
export default store;