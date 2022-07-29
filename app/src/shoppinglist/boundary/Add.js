import BElement from "../../BElement.js";
import { html } from "../../libs/lit-html.js";
import { itemUpdated, newItem } from "../control/ItemsControl.js";

class Add extends BElement {

    extractState({ items: { item } }) {
        return item;
    }

    view() {
        return html`
        <form>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input is-primary" required name="name" placeholder="Name" @keyup=${e=>
                this.onUserInput(e)} autofocus>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">Quantity</label>
                        <div class="control">
                            <input class="input is-primary" required name="quantity" placeholder="Quantity" @keyup=${e=>
                this.onUserInput(e)} value="1">
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Image</label>
                        <div class="control">
                            <div class="file">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="image" accept="image/*" capture
                                        @change="${e => this.onImageChosen(e)}">
                                    <span class=" file-cta">
                                        <span class="file-icon">
                                            <i class="fa fa-upload"></i>
                                        </span>
                                        <span class="file-label">
                                            Choose an image
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <p class="image is-128x128">
                        ${Object.entries(this.state)
                            .filter(([key, value]) => key === 'image')
                            .map(([key, value]) =>
                                html`
                                <img src="data:image/*;base64, ${value}" alt="Item image" />
                                `
                            )
                        }
                    </p>
                </div>
            </div >

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

    onUserInput({ target: { name, value } }) {
        itemUpdated(name, value);
    }

    onImageChosen({ target: { name, files } }) {
        // Get a reference to the file
        const file = files[0];
        // Encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = () => {
            // Use a regex to remove data url part
            const imageBase64 = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');
            itemUpdated(name, imageBase64);
        };
        reader.readAsDataURL(file);
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