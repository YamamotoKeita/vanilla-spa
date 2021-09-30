/**
 * HTTP通信リスナーのインターフェース
 */
export default class HttpConnectionListener {
    onStart() {}
    onReceiveData(xhr, response) {}
    onError(xhr, errorType) {}
    onEnd() {}
}
