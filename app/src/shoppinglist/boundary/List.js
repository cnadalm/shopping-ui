import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";
import { gotAllItems, deleteItem } from "../control/ItemsControl.js";

class List extends BElement {
    
    init() {
        gotAllItems();
    }

    extractState({ items: { list } }) {
        return list;
    }

    view() {
        return html`
        <div class="content">
            <ol>
                ${this.state.map(item =>
                    html`
                        <li>
                            <span>${new Date(item.createdAt).toLocaleDateString()} - ${item.name} (${item.quantity})</span>
                            <button @click="${_ => deleteItem(item.id)}" class="button is-small is-danger is-light">delete</button>
                        </li>
                    `
                )}
            </ol>
        </div>
        <!-- <button @click="${_ => gotAllItems()}" class="button is-small is-success is-light">refresh</button> -->
        `;
    }
}
customElements.define('wc-item-list',List);