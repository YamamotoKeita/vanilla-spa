import HttpApi from "../core/http-api.js";

/**
 * APIの基盤クラス。APIの共通仕様を書く
 */
export default class BaseApi extends HttpApi {

    get headers() {
        let headers = {};

        let method = this.httpMethod;
        if (method === 'POST' || method === 'PUT') {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }

    get bodyObject() {}

    get requestBody() {
        let obj = this.bodyObject
        if (obj !== undefined) {
            return JSON.stringify(obj);
        }
    }

    validate(xhr, response) {
        return xhr.status === 200;
    }

    convertResponse(xhr, response) {
        return JSON.parse(response);
    }
}
