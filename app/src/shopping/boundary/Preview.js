import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";

class Preview extends BElement {

    extractState({ items }) {
        return items;
    }
    view() {
        const { item: { label } } = this.state;
        return html`
        <div>
            <ol>
                <li><span><b>Label:</b> ${label}</span></li>
            </ol>
        </div>
        `;
    }
}
customElements.define('wc-item-preview', Preview);