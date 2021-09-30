import Router from "./core/router.js";
import LoginView from "./view/login-view.js";
import NurseryListView from "./view/nursery-list-view.js";
import NurseryDetailView from "./view/nursery-detail-view.js";
import NurseryRepository from "./repository/nursery-repository.js";

(() => {
    let store = { nurseryRepository: new NurseryRepository() };

    let router = new Router(document.body, [
        {
            path: '/',
            component: LoginView
        },
        {
            path: '/nurseries',
            component: NurseryListView,
            store: store
        },
        {
            path: '/nurseries/{nurseryId}',
            component: NurseryDetailView,
            store: store
        },
    ]);

    router.nextPage(location.pathname);
})();
