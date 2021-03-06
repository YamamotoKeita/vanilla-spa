
import Component from "../../core/component.js";

let modalIndicatorView = null;

/**
 * 全画面を覆うグルグルインジケーター
 */
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
            modalIndicatorView.element.parentNode.removeChild(modalIndicatorView.element);
        }
    }

    get html() {
        return `
<div class="modal-indicator">
<div class="loader"></div>
</div>`;
    }
}
