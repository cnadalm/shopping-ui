import { createReducer } from "../../libs/redux-toolkit.esm.js";
import { itemUpdatedAction, deleteItemAction, newItemAction, gotAllItemsAction } from "../control/ItemsControl.js";

const initialState = {
    list: [],
    item: {}
}

const removeItemWithId = (list, id) => {
    return list.filter(item => item.id !== id);
}

export const items = createReducer(initialState, (builder) => {
    builder.addCase(itemUpdatedAction, (state, { payload: { name, value } }) => {
        state.item[name] = value;
    }).addCase(newItemAction, (state) => {
        state.item = {}; // clear the item
    }).addCase(deleteItemAction, (state, { payload }) => {
        state.list = removeItemWithId(state.list, payload);
    }).addCase(gotAllItemsAction, (state, { payload }) => {
        state.list = payload;
    });
})