import { createAction } from "../../libs/redux-toolkit.esm.js";
import store from "../../store.js";

export const clearMessageAction = createAction("clearMessageAction");
export const clearMessage = _ => {
    store.dispatch(clearMessageAction());
};

export const operationSucceedAction = createAction("operationSucceedAction");
export const operationSucceed = (message) => {
    store.dispatch(
        operationSucceedAction({ message })
    );
    setTimeout(clearMessage, 5000);
};

export const errorHappenedAction = createAction("errorHappenedAction");
export const errorHappened = (message, error = 'unknown') => {
    store.dispatch(
        errorHappenedAction({
            error,
            message
        })
    );
    setTimeout(clearMessage, 30000);
};

export const requestStartedAction = createAction("requestStartedAction");
export const requestStarted = (payload) => {
    store.dispatch(requestStartedAction(payload));
};

export const requestCompletedAction = createAction("requestCompletedAction");
export const requestCompleted = (payload) => {
    store.dispatch(requestCompletedAction(payload));
};