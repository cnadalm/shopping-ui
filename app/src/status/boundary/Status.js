import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";
import { clearMessage } from "../control/StatusControl.js";

class Status extends BElement {

    extractState(redux) {
        return redux.status;
    }

    view() {
        const { message, error } = this.state;
        if (message === null || message.length === 0) {
            return html``;
        } else if (error === null || error.length === 0) {
            return html`
            <div class="notification is-success is-light">
                <button class="delete" aria-label="delete" @click=${_ => clearMessage()}></button>
                <p>${message}</p>
            </div>
            `;
        }
        return html`
            <article class="message is-danger is-small">
                <div class="message-header">
                    <p>${message}</p>
                    <button class="delete" aria-label="delete" @click=${_ => clearMessage()}></button>
                </div>
                <div class="message-body">
                    ${error}
                </div>
            </article>
        `;
    }
}
customElements.define('wc-status', Status);