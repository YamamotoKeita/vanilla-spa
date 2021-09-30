
import Component from "../../core/component.js";

let modalIndicatorView = null;

export default class ModalIndicator extends Component {

    constructor() {
        super();
    }

    /**
     * @param {HTMLElement} target
     */
    static show(target) {
        if (modalIndicatorView === null) {
            modalIndicatorView = new ModalIndicator();
        }
        target.appendChild(modalIndicatorView.element);
    }

    static hide() {
        if (modalIndicatorView !== null) {
            modalIndicatorView.element.remove();
        }
    }

    get html() {
        return `
<div class="modal-indicator">
<div class="loader"></div>
</div>`;
    }
}
