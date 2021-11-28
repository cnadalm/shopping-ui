import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";
import './Add.js';
import './Preview.js';

class Items extends BElement {

    view() {
        return html`
        <section>
            <wc-item-preview></wc-item-preview>
        </section>
        <section>
            <wc-item-add></wc-item-add>
        </section>
        `;
    }

}

customElements.define('wc-items', Items);