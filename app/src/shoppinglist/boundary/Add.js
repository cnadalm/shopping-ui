import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";
import { itemUpdated, newItem } from "../control/ItemsControl.js";

class Add extends BElement {

    view() {
        return html`
        <form>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input is-primary" type="text" required name="name" placeholder="Name" @keyup=${e=>
                            this.onUserInput(e)} >
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">Quantity</label>
                        <div class="control">
                            <input class="input is-primary" type="text" required name="quantity" placeholder="Quantity"
                                @keyup=${e=> this.onUserInput(e)} value="1">
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-primary" @click="${e => this.newItem(e)}">New item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        `;
    }

    onUserInput({ target: { name, value, type } }) {
        if (type === 'number') {
            value = Number(value); // cast to number
        }
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