import { create } from "../utils.js";

const rules = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    generateDOM() {
        create.element('h1', '', 'Règles', this.main)
    },
    bindEvents() {
        this.cacheDOM();
    }
}

export { rules }