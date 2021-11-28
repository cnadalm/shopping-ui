import { createReducer } from "../../libs/redux-toolkit.esm.js";
import { clearMessageAction, errorHappenedAction, requestCompletedAction, requestStartedAction } from "../control/StatusControl.js";

const initialState = {
        loading: {
            status: '',
            message: ''
        },
        message: ''
}

export const status = createReducer(initialState, (builder) => {
    builder.addCase(errorHappenedAction, (state, { payload: { error, message } }) => {
        state.error = error;
        state.message = message;
    }).addCase(clearMessageAction, (state, _) => {
        state.message = null;
        state.error = null;
    }).addCase(requestStartedAction, (state, { payload }) => {
        state.loading = {
            status: true,
            message: payload
        }
    }).addCase(requestCompletedAction, (state, { payload }) => {
        state.loading = {
            status: false,
            message: payload
        }
    });
});