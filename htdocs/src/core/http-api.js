/**
 * HTTP APIのインターフェース
 * 分かりやすさのため各APIクラスは明示的にこのクラスを継承する
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
     * @return
     *
     */
    convertResponse(xhr, response) {}
}
