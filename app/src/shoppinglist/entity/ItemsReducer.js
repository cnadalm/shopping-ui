import { createReducer } from "../../libs/redux-toolkit.esm.js";
import { itemUpdatedAction, deleteItemAction, acquireItemAction, releaseItemAction, newItemAction, gotAllPendingItemsAction, gotAllAcquiredItemsAction } from "../control/ItemsControl.js";

const initialState = {
    list: [],
    item: { quantity: "1" },
    acquiredList: []
};

const removeItemWithId = (list, id) => {
    return list.filter(item => item.id !== id);
};

export const items = createReducer(initialState, (builder) => {
    builder.addCase(itemUpdatedAction, (state, { payload: { name, value } }) => {
        state.item[name] = value;
    }).addCase(newItemAction, (state) => {
        state.item = { quantity: "1" }; // clear the item
    }).addCase(deleteItemAction, (state, { payload }) => {
        state.acquiredList = removeItemWithId(state.acquiredList, payload);
    }).addCase(acquireItemAction, (state, { payload }) => {
        state.list = removeItemWithId(state.list, payload);
    }).addCase(releaseItemAction, (state, { payload }) => {
        state.acquiredList = removeItemWithId(state.acquiredList, payload);
    }).addCase(gotAllPendingItemsAction, (state, { payload }) => {
        state.list = payload;
    }).addCase(gotAllAcquiredItemsAction, (state, { payload }) => {
        state.acquiredList = payload;
    });
});