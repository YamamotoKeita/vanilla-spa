import ModalIndicator from "../component/common/modal-indicator.js";
import HttpConnectionListener from "../core/http-connection-listener.js";

/**
 * 通信中にモーダルのインジケーターを表示する
 */
export default class ModalIndicatorBehavior extends HttpConnectionListener {
    onStart() {
        ModalIndicator.show(document.body);
    }

    onEnd() {
        ModalIndicator.hide();
    }
}
