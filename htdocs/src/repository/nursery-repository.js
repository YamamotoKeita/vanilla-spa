import GetNurseriesApi from "../api/get-nurseries-api.js";
import ApiConnector from "../api/api-connector.js";

/**
 * 保育園データのリポジトリ
 */
export default class NurseryRepository {
    constructor() {
        this.nurseries = null;
        this.callbacks = [];
    }

    loadData() {
        let api = new GetNurseriesApi();
        new ApiConnector(api).run(response => {
            this.nurseries = response;
            this.callbacks.forEach(callback => callback(response));
            this.callbacks.length = 0;
        });
    }

    getAllNurseries(then) {
        if (this.nurseries) {
            then(this.nurseries);
        } else {
            this.loadData();
            this.callbacks.push(then);
        }
    }

    getNursery(nurseryId, then) {
        let callback = () => {
            let nursery = this.nurseries.find(nursery => nursery.id === nurseryId);
            then(nursery);
        }

        if (this.nurseries) {
            callback();
        } else {
            this.loadData();
            this.callbacks.push(callback);
        }
    }
}
