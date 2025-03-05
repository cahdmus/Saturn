import { roll, create } from "/src/utils.js";
import sceneData from './sceneData.json' assert { type: 'json' };

const sceneGenerator = {
    init() {
        this.eventType = this.getEventType();
        this.keyWords = this.getKeyWords();
        this.meaning = this.getMeaning();
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'sceneGenerator');
        this.title = create.element('h1', '', 'Générateur de scene', this.module);

        this.infoTable = document.createElement('table');
        create.row(this.infoTable, `Type`, this.eventType, 0);
        create.row(this.infoTable, `Mots clefs`, this.keyWords, 1);
        create.row(this.infoTable, `Sens`, this.meaning, 2);
        this.module.appendChild(this.infoTable);

        // CHAOS
        this.chaosTitle = create.element('h3', '', 'Chaos', this.module);
        this.chaos = create.element('input', 'sceneChaos', '', this.chaosTitle);
        this.chaos.setAttribute('type', 'text')
        this.chaos.value = '5'

        // RESULT and BUTTON
        this.mod = create.element('h1', '', 'Scène modifiée ?', this.module);
        this.result = create.element('div', 'result', '...', this.module);
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);

        this.webPage.appendChild(this.module);
    },
    getEventType() {
        const chance = roll.d100();

        if (chance <= 6) {
            return 'Evènement perturbateur a lieu ailleurs';
        } else if (chance > 6 && chance <= 27) {
            return 'Action surprise de PNJ';
        } else if (chance > 27 && chance <= 34) {
            return 'Nouveau PNJ';
        } else if (chance > 34 && chance <= 44) {
            return 'Avancer dans un thread';
        } else if (chance > 44 && chance <= 51) {
            return `S'éloigner d'un thread`;
        } else if (chance > 51 && chance <= 54) {
            return `Fermer un thread`;
        } else if (chance > 54 && chance <= 66) {
            return `Événement négatif pour le joueur`;
        } else if (chance > 66 && chance <= 74) {
            return `Événement positif pour le joueur`;
        } else if (chance > 74 && chance <= 82) {
            return `Événement ambigu`;
        } else if (chance > 82 && chance <= 93) {
            return `Événement négatif pour un PNJ`;
        } else if (chance > 93 && chance <= 100) {
            return `Événement positif pour un PNJ`;
        }
    },
    getKeyWords() {
        const verb = roll.from(sceneData["Key words"].verb);
        const noun = roll.from(sceneData["Key words"].noun);
        return `${verb} ${noun}`
    },
    getMeaning() {
        return roll.from(sceneData.Meaning)
    },
    isModified() {
        const chaos = this.chaos.value;
        const chance = roll.d10();

        console.log(chance);
        if (chaos <= chance) {
            return "La scène n'est pas modifiée"
        } else if (chance % 2 == 0) {
            return "La scène est légèrement modifiée"
        } else if (chance % 2 != 0) {
            return "La scène déraille totalement !"
        }
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            const value = this.isModified();
            this.result.innerHTML = value;
        });
    }
}

export { sceneGenerator }