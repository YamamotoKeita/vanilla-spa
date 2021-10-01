import Component from "../core/component.js";

/**
 * 保育園一覧の行
 */
export default class NurseryRowView extends Component {
    constructor(nursery) {
        super();
        this.onDetailClicked = nurseryId => {};

        this.nameView = this.findElement('.name');
        this.addressView = this.findElement('.address');
        this.detailButton = this.findElement('.detail button');

        this.detailButton.onclick = e => this.onDetailClicked(this.nursery.id);

        this.setNursery(nursery);
    }

    setNursery(nursery) {
        this.nursery = nursery;
        this.nameView.textContent = nursery.name;
        this.addressView.textContent = nursery.address;
    }

    get containerTag() {
        return 'tbody';
    }

    get html() {
        return `
<tr class="nursery-row-view">
    <td class="name"></td>
    <td class="address"></td>
    <td class="detail"><button>詳細</button></td>
</tr>
        `;
    }
}
