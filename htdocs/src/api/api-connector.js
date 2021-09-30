/**
 * 保育園マップ共有のAPIコネクター
 */
import HttpConnection from "../core/http-connection.js";
import HttpConnectionListener from "../core/http-connection-listener.js";


export default class ApiConnector extends HttpConnectionListener{
    constructor(api, ...listeners) {
        super();
        this.api = api;
        this.listeners = listeners;
        this.connection = null;
    }

    run(onSuccess) {
        let connection = new HttpConnection(this.api, response => {
            onSuccess(response);
        });
        this.connection = connection;

        connection.listeners.push(this);
        this.listeners.forEach(v => connection.listeners.push(v) );

        connection.connect();
        return this;
    }

    onReceiveData(xhr, response) {
    }

    /**
     * エラー発生時の処理
     * @param xhr
     * @param errorType
     */
    onError(xhr, errorType) {
        this.showErrorMessage(xhr, errorType);
    }

    showErrorMessage(xhr, errorType) {
        let title = this.getErrorTitle(xhr, errorType);
        console.log(`${title}: ${this.api.url}`);
    }

    getErrorTitle(xhr, errorType) {
        switch (errorType) {
            case 'networkError':
            case 'timeout':
            case 'aborted':
                return '通信エラー';
            case 'invalidResponse':
                if (xhr.status === 200) {
                    return '想定外のレスポンス';
                } else if (400 <= xhr.status && xhr.status <= 499) {
                    return 'リクエストエラー';
                } else if (500 <= xhr.status && xhr.status <= 599) {
                    return 'サーバーエラー';
                } else {
                    return `通信エラー ${xhr.status}`;
                }
            default:
                throw `不明なエラータイプ ${errorType}`;
        }
    }
}
