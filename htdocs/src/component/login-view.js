import Component from "../core/component.js";
import ApiConnector from "../api/api-connector.js";
import LoginApi from "../api/login-api.js";
import ModalIndicatorBehavior from "../api/modal-indicator-behavior.js";

/**
 * ログイン画面
 */
export default class LoginView extends Component {
    constructor() {
        super();

        this.loginIdView = this.findElement('input.login-id');
        this.passwordView = this.findElement('input.password');
        this.loginButton = this.findElement('button.login');

        this.loginButton.onclick = e => this.onLoginButtonClick();
    }

    onLoginButtonClick() {
        let loginId = this.loginIdView.value;
        let password = this.passwordView.value;

        let api = new LoginApi(loginId, password);
        new ApiConnector(api, new ModalIndicatorBehavior()).run(response => {
            this.router.nextPage('/nurseries');
        });
    }

    get html() {
        return `
<div class="login-view">
    <div class="container">       
        <div class="row">
            <input class="login-id" type="text" placeholder="ログインID" />
        </div>
        <div class="row">
            <input class="password" type="password" placeholder="パスワード" />
        </div>
        <div>
            <button class="login">ログイン</button>
        </div>
    </div>
</div>
        `;
    }
}
