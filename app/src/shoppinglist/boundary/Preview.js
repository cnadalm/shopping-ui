import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";

class Preview extends BElement {

    extractState({ items }) {
        return items;
    }
    view() {
        const { item: { name, quantity } } = this.state;
        return html`
        <div>
            <ol>
                <li><span><b>Name:</b> ${name}</span></li>
                <li><span><b>Quantity:</b> ${quantity}</span></li>
            </ol>
        </div>
        `;
    }
}
customElements.define('wc-item-preview', Preview);