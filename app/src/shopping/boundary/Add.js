import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";
import { itemUpdated, newItem } from "../control/ItemsControl.js";

class Add extends BElement {

    view() {
        return html`
        <form>
            <label class="label">Label
                <input class="input is-primary" required name="label" placeholder="label" @keyup=${e => this.onUserInput(e)} >
            </label>
            <button class="button is-primary" @click="${e => this.newItem(e)}">new item</button>
        </form>
        `;
    }
    onUserInput({ target: { name, value } }) {
        itemUpdated(name, value);
    }

    newItem(event) {
        const { target: { form } } = event;
        event.preventDefault();
        form.reportValidity();
        if (form.checkValidity()) {
            newItem();
            form.reset();
        }
    }
}

customElements.define('wc-item-add', Add);