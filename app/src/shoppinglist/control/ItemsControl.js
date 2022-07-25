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

export const acquireItemAction = createAction("acquireItemAction");
export const acquireItem = async (id) => {
    requestStarted('acquire item');
    try {
        await fetch(`${baseUrl}/${apiItems}/${id}/acquire`, {
            method: 'PUT'
        });
    } catch (error) {
        errorHappened('Server error', error.message);
        return;
    } finally {
        requestCompleted('acquire item');
    }
    operationSucceed('Item acquired');
    store.dispatch(acquireItemAction(id));
};

export const releaseItemAction = createAction("releaseItemAction");
export const releaseItem = async (id) => {
    requestStarted('release item');
    try {
        await fetch(`${baseUrl}/${apiItems}/${id}/acquire`, {
            method: 'DELETE'
        });
    } catch (error) {
        errorHappened('Server error', error.message);
        return;
    } finally {
        requestCompleted('release item');
    }
    operationSucceed('Item released');
    store.dispatch(releaseItemAction(id));
};

export const gotAllPendingItemsAction = createAction("gotAllPendingItemsAction");
export const gotAllAcquiredItemsAction = createAction("gotAllAcquiredItemsAction");
export const gotAllItemsByState = async (shoppingListState) => {
    let items;
    requestStarted(`get all items by state ${shoppingListState}`);
    try {
        const response = await fetch(`${baseUrl}/${apiItems}/${shoppingListState}`);
        items = await response.json();
    } catch (error) {
        errorHappened('Server error', error.message);
        return;
    } finally {
        requestCompleted(`get all items by state ${shoppingListState}`);
    }
    if(shoppingListState === 'pending') {
        store.dispatch(gotAllPendingItemsAction(items));
    } else {
        store.dispatch(gotAllAcquiredItemsAction(items));
    }
};