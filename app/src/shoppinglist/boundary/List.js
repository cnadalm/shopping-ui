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

        const itemsByDate = new Map();
        this.state.forEach((item) => {
            const { createdAt } = item;
            const date = new Date(createdAt).toLocaleDateString();
            const items = itemsByDate.get(date);
            if (!items) {
                itemsByDate.set(date, [item]);
            } else {
                items.push(item);
            }
        });

        return html`
        <div class="content">
            <ol>
                ${Array.from(itemsByDate.entries()).map(([date, items]) => {
                    return html`
                        <li>
                            <span><h6>${date}</h6></span>
                        </li>

                        ${items.map((item) => {
                            return html`
                            <li>
                                <span>
                                    ${item.name} (${item.quantity})
                                    ${Object.entries(item)
                                        .filter(([key, value]) => key === 'image' && value)
                                        .map(([key, value]) =>
                                        html`
                                        <p >
                                            <img src="data:image/*;base64, ${value}" alt="Item image" />
                                        </p>
                                        `
                                        )
                                    }
                                </span>
                                
                                <button @click="${_ => deleteItem(item.id)}" class="button is-medium is-success is-light">
                                    <span class="icon">
                                        <i class="fa fa-check" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </li>            
                            `;    
                        })}
                    `;
                })}
            </ol>
        </div>
        <!-- <button @click="${_ => gotAllItems()}" class="button is-small is-success is-light">refresh</button> -->
        `;
    }
}
customElements.define('wc-item-list',List);