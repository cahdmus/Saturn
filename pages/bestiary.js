import { create } from "../utils.js";

const bestiary = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    generateDOM() {
        create.element('h1', '', 'Bestiaire', this.main)
        create.hr(this.main)
    },
    bindEvents() {
        this.cacheDOM();
    }
}

export { bestiary }