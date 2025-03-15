import { create } from "../utils.js";

const explo = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    generateDOM() {
        create.element('h1', '', 'Exploration', this.main)
        create.hr(this.main)
    },
    bindEvents() {
        this.cacheDOM();
    }
}

export { explo }