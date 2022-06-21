import { baseUrl, apiItems } from "../../app.config.js";
import { createAction } from "../../libs/redux-toolkit.esm.js";
import { operationSucceed, errorHappened, requestCompleted, requestStarted } from "../../status/control/StatusControl.js";
import store from "../../store.js";

export const itemUpdatedAction = createAction("itemUpdatedAction");
export const itemUpdated = (name, value) => {
    store.dispatch(itemUpdatedAction({ name, value }));
};

export const newItemAction = createAction("newItemAction");
export const newItem = async () => {
    const { items: { item } } = store.getState();
    requestStarted('create new item');
    try {
        await fetch(`${baseUrl}/${apiItems}`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    } catch (error) {
        errorHappened('Server error', error.message);
        return;
    } finally {
        requestCompleted('create new item');
    }
    operationSucceed('Item created');
    store.dispatch(newItemAction());
};

export const deleteItemAction = createAction("deleteItemAction");
export const deleteItem = async (id) => {
    requestStarted('delete item');
    try {
        await fetch(`${baseUrl}/${apiItems}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        errorHappened('Server error', error.message);
        return;
    } finally {
        requestCompleted('delete item');
    }
    operationSucceed('Item deleted');
    store.dispatch(deleteItemAction(id));
};

export const gotAllItemsAction = createAction("gotAllItemsAction");
export const gotAllItems = async () => {
    let items;
    requestStarted('get all shopping items');
    try {
        const response = await fetch(`${baseUrl}/${apiItems}`);
        items = await response.json();
    } catch (error) {
        errorHappened('Server error', error.message);
        return;
    } finally {
        requestCompleted('get all shopping items');
    }
    store.dispatch(gotAllItemsAction(items));
};