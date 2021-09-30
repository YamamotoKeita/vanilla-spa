import BaseApi from "./base-api.js";

/**
 * 保育園一覧を取得するAPI
 * ここではダミーのJSONを取得する
 */
export default class GetNurseriesApi extends BaseApi {
    constructor() {
        super();
    }

    get url() { return `/assets/nurseries.json`; }

    get httpMethod() { return 'GET'; }
}
