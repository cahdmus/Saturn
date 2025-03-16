import { create } from "../utils.js";
import { explorationGenerator } from "../exploration/exploration.js";
import { letterGenerator } from "../letterGenerator/letterGenerator.js"
import { miscellaneousGenerator } from "../miscellaneous/miscellaneous.js"
import { quest } from "../quest/quest.js";
import { explorationImage } from "../exploration/explorationImage.js";
import { roomGenerator } from "../exploration/roomGenerator.js";

const explo = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
        explorationImage.init();
        miscellaneousGenerator.init();
        explorationGenerator.init();
        letterGenerator.init();
        quest.init();
        roomGenerator.init();
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    generateDOM() {
        create.element('h1', '', 'Exploration', this.main)
        create.hr(this.main)

        this.content = create.element('div', 'exploContent', '', this.main);
    },
    bindEvents() {
        this.cacheDOM();
    }
}

export { explo }