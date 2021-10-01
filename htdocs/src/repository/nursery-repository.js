import GetNurseriesApi from "../api/get-nurseries-api.js";
import ApiConnector from "../api/api-connector.js";

/**
 * 保育園データのリポジトリ
 */
export default class NurseryRepository {
    constructor() {
        this.onNurseryUpdated = nurseries => {};
        this.nurseries = null;
    }

    refresh() {
        let api = new GetNurseriesApi();
        new ApiConnector(api).run(response => {
            this.nurseries = response;
            this.onNurseryUpdated(response);
        });
    }

    getNursery(nurseryId) {
        if (this.nurseries) {
            return this.nurseries.find(nursery => nursery.id === nurseryId);
        }
        return null;
    }
}
