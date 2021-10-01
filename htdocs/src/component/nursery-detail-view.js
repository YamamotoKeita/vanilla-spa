import Component from "../core/component.js";

/**
 * 保育園詳細画面
 */
export default class NurseryDetailView extends Component {
    constructor(parameters, store) {
        super();

        this.nurseryId = Number(parameters.nurseryId);
        this.nurseryRepository = store.nurseryRepository;

        this.nameView = this.findElement('.name');
        this.furiganaView = this.findElement('.furigana');
        this.addressView = this.findElement('.address');
        this.phoneNumberView = this.findElement('.phone-number');
        this.managerView = this.findElement('.manager');
        this.homepageLinkView = this.findElement('.homepage a');
        this.policyView = this.findElement('.policy');

        this.backButton = this.findElement('.back-button');

        this.backButton.onclick = e => this.onBackButtonClick();
    }

    onEnterForeground() {
        let nursery = this.nurseryRepository.getNursery(this.nurseryId);
        this.updateView(nursery);
    }

    updateView(nursery) {
        this.nameView.textContent = nursery.name;
        this.furiganaView.textContent = nursery.nameKana;
        this.addressView.textContent = nursery.address;
        this.phoneNumberView.textContent = nursery.phoneNumber;
        this.managerView.textContent = nursery.manager;
        this.homepageLinkView.textContent = nursery.homepageURL;
        this.homepageLinkView.setAttribute('href', nursery.homepageURL);
        this.policyView.textContent = nursery.policy;
    }

    onBackButtonClick() {
        this.router.backPage();
    }

    get html() {
        return `
<div class="nursery-detail-view">
    <header>
        <button class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.1 21.9"><polygon points="10.9 21.9 0 10.9 10.9 0 13.1 2.1 4.2 10.9 13.1 19.8 10.9 21.9"></polygon></svg>
            <span>戻る</span>
        </button>
        <div class="name"></div>
    </header>
    
    <div class="main-container">
        <div class="title">基本情報</div>
        <div class="information">
            <dl>
                <dt>ふりがな</dt>
                <dd class="furigana"></dd>
            </dl>
            <hr />
            <dl>
                <dt>ホームページ</dt>
                <dd class="homepage"><a target="_blank"></a></dd>    
            </dl>
            <hr />
            <dl>
                <dt>住所</dt>
                <dd class="address"></dd>    
            </dl>
            <hr />
            <dl>
                <dt>電話番号</dt>
                <dd class="phone-number"></dd>
            </dl>
            <hr />
            <dl>
                <dt>運営者</dt>
                <dd class="manager"></dd>    
            </dl>
            <hr />    
        </div>
        
        <div class="title">保育方針</div>
        <div class="policy"></div>
    </div>
</div>
        `;
    }
}
