import { create } from "../utils.js";

const combat = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    generateDOM() {
        create.element('h1', '', 'Combat', this.main)
    },
    bindEvents() {
        this.cacheDOM();
    }
}

export { combat }