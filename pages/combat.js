import { create } from "../utils.js";
import { opposition } from "../opposition/opposition.js"
import { combatEmulator } from "../combatEmulator/combatEmulator.js"
import { randomBestiary } from "../bestiary/randomBestiary.js";
import { monsterMachine } from "../NPCGenerator/monsterMachine.js"

const combat = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
        opposition.init();
        randomBestiary.init();
        combatEmulator.init();
        monsterMachine.init();
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    generateDOM() {
        create.element('h1', '', 'Combat', this.main)
        create.hr(this.main)

        this.content = create.element('div', 'combatContent', '', this.main);
    },
    bindEvents() {
        this.cacheDOM();
    }
}

export { combat }