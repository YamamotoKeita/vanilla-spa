import Component from "../core/component.js";
import NurseryRepository from "../repository/nursery-repository.js";
import NurseryRowView from "./nursery-row-view.js";

export default class NurseryListView extends Component {
    constructor(parameters, store) {
        super();

        this.tbody = this.findElement('table.nursery-list tbody');

        this.nurseryRepository = store.nurseryRepository;
        this.nurseryRepository.onNurseryUpdated = nurseries => this.onNurseryUpdated(nurseries);
    }

    onEnterForeground() {
        this.nurseryRepository.refresh();
    }

    onNurseryUpdated(nurseries) {
        this.tbody.innerHTML = '';

        nurseries.forEach(nursery => {
            let row = new NurseryRowView(nursery);
            this.tbody.appendChild(row.element);
            row.onDetailClicked = nurseryId => this.onDetailClicked(nurseryId);
        })
    }

    onDetailClicked(nurseryId) {
        this.router.nextPage(`/nurseries/${nurseryId}`);
    }

    get html() {
        return `
<div class="nursery-list-view">
    <div class="title">保育施設一覧</div>
    <table class="nursery-list">
        <thead>
            <tr>
                <th class="name">施設名</th>
                <th class="address">住所</th>
                <th class="detail">詳細</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>
        `;
    }
}
