import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";
import { getAllItems, deleteItem } from "../control/ItemsControl.js";

class List extends BElement {
    
    init() {
        getAllItems();
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
                            <span>${new Date(item.createdAt).toLocaleString().slice(0, 5)}</span>
                            <span>${item.label}</span>
                            <button @click="${_ => deleteItem(item.id)}" class="button is-small is-danger is-light">delete</button>
                        </li>
                    `)}
            </ol>
        </div>
        <!-- <button @click="${_ => getAllItems()}" class="button is-small is-success is-light">refresh</button> -->
        `;
    }
}
customElements.define('wc-item-list',List);