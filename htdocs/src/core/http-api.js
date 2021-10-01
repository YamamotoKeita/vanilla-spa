/**
 * HTTP APIのインターフェース
 * 各APIクラスはこのクラスを継承する
 */
export default class HttpApi {

    /**
     * @return {string}
     */
    get url() {}

    /**
     * @return {string}
     */
    get httpMethod() { return 'GET'; }

    /**
     * @return {Object.<string, string>}
     */
    get headers() {}

    /**
     * @return {string}
     */
    get requestBody() {}

    /**
     * @return {{key:string, value:string}[]}
     */
    get urlQuery() {}

    /**
     *
     * @param xhr {XMLHttpRequest}
     * @param response {string}
     * @return {boolean}
     *
     */
    validate(xhr, response) {}

    /**
     *
     * @param xhr {XMLHttpRequest}
     * @param response {string}
     * @return {any}
     *
     */
    convertResponse(xhr, response) {}
}
