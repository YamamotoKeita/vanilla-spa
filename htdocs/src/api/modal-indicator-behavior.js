import ModalIndicator from "../view/common/modal-indicator.js";
import HttpConnectionListener from "../core/http-connection-listener.js";

/**
 * 通信実行中にモーダルのインジケーターを表示する
 */
export default class ModalIndicatorBehavior extends HttpConnectionListener {
    onStart() {
        ModalIndicator.show(document.body);
    }

    onEnd() {
        ModalIndicator.hide();
    }
}
