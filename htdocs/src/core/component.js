
export default class Component {

    constructor() {
        /** @type {null | object} */
        this.store = null;
        /** @type {null | Router} */
        this.router = null;
        /** @type {HTMLElement} */
        this.element = Component.createElementFromHTML(this.html, this.containerTag);
        this.element.classList.add('component');
    }

    onEnterForeground() {
        // override
    }

    /**
     * @return {string}
     */
    get containerTag() {
        return 'div';
    }

    /**
     * @return {string}
     */
    get html() { }

    /**
     * @param {string} query
     * @return {HTMLElement}
     */
    findElement(query) {
        return this.element.querySelector(query);
    }

    /**
     * @param {string} query
     * @return {HTMLElement[]}
     */
    findElements(query) {
        let nodeList = this.element.querySelectorAll(query);
        return Array.from(nodeList);
    }

    /**
     * @param {string} html
     * @param {string} containerTag
     * @return {HTMLElement}
     */
    static createElementFromHTML(html, containerTag) {
        let container = document.createElement(containerTag);
        container.innerHTML = html.trim();
        return container.firstChild;
    }
}
