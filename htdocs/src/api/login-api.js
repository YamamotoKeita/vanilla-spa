import BaseApi from "./base-api.js";

/**
 * ログインのAPI通信
 * 本来ならログインIDとパスワードをPOSTするが、ここではダミーのログイン結果をGETで取得するだけ。
 */
export default class LoginApi extends BaseApi {
    constructor(loginId, password) {
        super();
    }

    get url() { return `/assets/nurseries.json`; }

    get httpMethod() { return 'GET'; }
}
