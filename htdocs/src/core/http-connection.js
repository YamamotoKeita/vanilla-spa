/**
 * HTTP通信を行う
 */
export default class HttpConnection {

    /**
     * @param api {HttpApi}
     * @param onSuccess {function}
     */
    constructor(api, onSuccess) {
        this.api = api;
        this.onSuccess = onSuccess;
        /**
         * @type {HttpConnectionListener[]}
         */
        this.listeners = [];
    }

    connect() {
        let xhr = new XMLHttpRequest();

        // 通信完了（成功、失敗どちらでも呼ばれる）
        xhr.onloadend = () => {
            this.onEnd();
        };

        // 通信成功
        xhr.onload = (event) => {
            this.onReceiveData(this.onSuccess, xhr);
        };

        // 通信エラー
        xhr.onerror = (event) => {
            this.onError(xhr, 'networkError');
        };

        // タイムアウト
        xhr.ontimeout = (event) => {
            this.onError(xhr, 'timeout');
        };

        // 中断
        xhr.onabort = (event) => {
            this.onError(xhr, 'aborted');
        };

        let url = this.makeURL(this.api.url, this.api.urlQuery);

        xhr.open(this.api.httpMethod, url);
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        let headers = this.api.headers;
        if (headers) {
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        // NOTE: サンプルとして通信していることが分かりやすいよう少し遅延させる
        setTimeout(() => {
            // 送信
            xhr.send(this.api.requestBody);
        }, 500);

        this.listeners.forEach(listener => listener.onStart());
    }

    onReceiveData(onSuccess, xhr) {
        let response = xhr.response;
        this.listeners.forEach(listener => listener.onReceiveData(xhr, response));

        let data = null;
        try {
            if (this.api.validate(xhr, response)) {
                data = this.api.convertResponse(xhr, response);
            }
        } catch (error) {
            console.error(`レスポンスのパースに失敗。${error}`);
        }

        if (data !== null) {
            onSuccess(data);
        } else {
            this.onError(xhr, 'invalidResponse')
        }
    }

    onError(xhr, errorType) {
        this.listeners.forEach(listener => listener.onError(xhr, errorType));
    }

    onEnd() {
        this.listeners.forEach(listener => listener.onEnd());
    }

    makeURL(baseURL, queryArray) {
        let url = baseURL;

        if (queryArray) {
            let query = queryArray.map(keyValue => {
                let key = decodeURIComponent(keyValue.key);
                let value = (keyValue.value !== null) ? decodeURIComponent(keyValue.value) : null;
                return `${key}=${value}`;
            }).join('&');

            let separator = url.includes("?") ? "&" : "?";
            url += separator + query;
        }

        return url;
    }
}
