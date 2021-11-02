
import HttpConnection from "../core/http-connection.js";
import HttpConnectionListener from "../core/http-connection-listener.js";

/**
 * 通信処理。アプリケーション内での通信時の共通処理を書く
 */
export default class ApiConnector extends HttpConnectionListener {
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
        // データ受信時の共通処理
    }

    /**
     * エラー発生時の処理
     * @param xhr
     * @param errorType
     */
    onError(xhr, errorType) {
        let title = this.getErrorTitle(xhr, errorType);
        console.log(`${title}: ${this.api.url}`);
    }

    getErrorTitle(xhr, errorType) {
        switch (errorType) {
            case 'networkError':
            case 'timeout':
            case 'aborted':
                return '通信エラー';
            case 'validationError':
            case 'parseError':
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
