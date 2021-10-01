/**
 * SPA用のルーター
 */
export default class Router {

    /**
     * @param {HTMLElement} rootElement
     * @param {{ path: string, component: any, store?: object }[]} routeInfo
     */
    constructor(rootElement, routeInfo) {
        this.pageStack = [];
        this.rootElement = rootElement;
        this.routeInfo = routeInfo;

        // NOTE: コピー面倒なので引数破壊する
        routeInfo.forEach(route => {
            let pathInfo = Router.parsePath(route.path);
            route.pathRegExp = pathInfo.regExp;
            route.pathParameterNames = pathInfo.parameterNames;
        });

        window.addEventListener('popstate', e => {
            if (e.state.depth < this.pageStack.length) {
                this.onHistoryBack();
            } else {
                this.onHistoryForward(e.state);
            }
        });
    }

    nextPage(path) {
        return this._changePage(path);
    }

    backPage() {
        history.back();
    }

    _changePage(path) {
        let route = this.getMatchedRoute(path);
        // NOTE: どこにもマッチしないケースは面倒なので無視

        let component = new route.component(route.parameters, route.store);
        component.router = this;

        if (0 < this.pageStack.length) {
            this.foregroundPage.element.remove();
        }

        let data = {
            depth: this.pageStack.length + 1,
            path: path
        };

        // ルート画面の場合はpushでなくreplaceする（ルートでpushすると遷移元に戻るのにブラウザバックが2回必要になる）
        if (this.pageStack.length === 0) {
            history.replaceState(data, null, path);
        } else {
            history.pushState(data, null, path);
        }

        this.pageStack.push(component);
        this.rootElement.appendChild(component.element);
        component.onEnterForeground();
        return component;
    }

    onHistoryBack() {
        if (this.pageStack.length === 1) {
            return;
        }

        let currentPage = this.pageStack.pop();
        currentPage.router = null;
        currentPage.element.remove();

        let page = this.foregroundPage;
        this.rootElement.appendChild(page.element);
        page.onEnterForeground();
    }

    onHistoryForward(data) {
        this.foregroundPage.element.remove();

        let route = this.getMatchedRoute(data.path);
        let component = new route.component(route.parameters, route.store);
        this.pageStack.push(component);
        component.router = this;

        this.rootElement.appendChild(component.element);
        component.onEnterForeground();
    }

    getMatchedRoute(path) {
        if (path === '') {
            path = '/';
        } else if (1 < path.length && path.endsWith('/')) {
            path = path.substring(0, path.length - 1);
        }

        for (let i = 0; i < this.routeInfo.length; i++) {
            let route = this.routeInfo[i];
            let matchResult = route.pathRegExp.exec(path);
            if (matchResult === null) {
                continue;
            }

            let parameters = {};
            route.pathParameterNames.forEach((name, index) => {
                parameters[name] = matchResult[index + 1];
            });

            return {
                component: route.component,
                store: route.store,
                parameters: parameters
            };
        }
        return null;
    }

    get foregroundPage() {
        return this.pageStack[this.pageStack.length - 1];
    }

    static parsePath(path) {
        let escapeTargets = '*+.?()^$-';
        let escapeMap = {};
        for (let i = 0; i < escapeTargets.length; i++) {
            let c = escapeTargets[i];
            escapeMap[c] = '\\' + c;
        }

        let pathRegex = '';
        let argName = '';
        let inBrace = false;
        let parameterNames = [];

        for (let i = 0; i < path.length; i++) {
            let char = path[i];

            if (inBrace) {
                if (char === '}') {
                    parameterNames.push(argName);
                    argName = '';
                    inBrace = false;
                } else {
                    argName += char;
                }
            } else if (char === '{') {
                inBrace = true;
                pathRegex += '(.+)';
            } else {
                let escaped = escapeMap[char];
                if (escaped) {
                    pathRegex += escaped;
                } else {
                    pathRegex += char;
                }
            }
        }

        return {
            regExp: new RegExp(`^${pathRegex}$`),
            parameterNames: parameterNames
        };
    }
}
