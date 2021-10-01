/**
 * HTTP通信リスナーのインターフェース
 * 通信の開始、終了、エラー、データ受信時に処理を挟み込むために使う
 */
export default class HttpConnectionListener {
    onStart() {}
    onReceiveData(xhr, response) {}
    onError(xhr, errorType) {}
    onEnd() {}
}
