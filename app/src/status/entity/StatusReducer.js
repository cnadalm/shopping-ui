import { createReducer } from "../../libs/redux-toolkit.esm.js";
import { clearMessageAction, operationSucceedAction, errorHappenedAction, requestCompletedAction, requestStartedAction } from "../control/StatusControl.js";

const initialState = {
        loading: {
            status: '',
            message: ''
        },
        message: ''
}

export const status = createReducer(initialState, (builder) => {
    builder.addCase(operationSucceedAction, (state, { payload: { message } }) => {
        state.message = message;
    }).addCase(errorHappenedAction, (state, { payload: { error, message } }) => {
        state.error = error;
        state.message = message;
    }).addCase(clearMessageAction, (state, _) => {
        state.error = null;
        state.message = null;
    }).addCase(requestStartedAction, (state, { payload }) => {
        state.loading = {
            status: true,
            message: payload
        };
    }).addCase(requestCompletedAction, (state, { payload }) => {
        state.loading = {
            status: false,
            message: payload
        };
    });
});