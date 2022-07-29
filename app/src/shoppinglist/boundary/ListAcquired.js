import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";
import { gotAllItemsByState, releaseItem, deleteItem } from "../control/ItemsControl.js";

class ListAcquired extends BElement {
    
    init() {
        gotAllItemsByState('acquired');
    }

    extractState({ items: { acquiredList } }) {
        return acquiredList;
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
                                        <p>
                                            <img src="data:image/*;base64, ${value}" alt="Item image" />
                                        </p>
                                        `
                                        )
                                    }
                                </span>
                                
                                <div class="field is-grouped">
                                    <p class="control">
                                        <button @click="${_ => releaseItem(item.id)}" class="button is-medium is-link is-light" title="Release">
                                            <span class="icon">
                                                <i class="fa fa-undo" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </p>
                                    <p class="control">
                                        <button @click="${_ => deleteItem(item.id)}" class="button is-medium is-danger is-light" title="Delete">
                                            <span class="icon">
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </p>
                                </div>
                            </li>            
                            `;    
                        })}
                    `;
                })}
            </ol>
        </div>
        `;
    }
}
customElements.define('wc-item-list-acquired', ListAcquired);