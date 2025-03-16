import { roll, create } from "../utils.js";
import sceneData from './sceneData.json' with { type: 'json' };

const sceneGenerator = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.roll(),
        this.bindEvents();
    },
    cacheDOM() {
        this.content = document.querySelector('#rulesPage');
    },
    roll() {
        this.infoTable.rows[0].cells[1].innerHTML = this.getEventType();
        this.infoTable.rows[1].cells[1].innerHTML = this.getKeyWords();
        this.infoTable.rows[2].cells[1].innerHTML = this.getMeaning();
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'sceneGenerator');
        this.title = create.element('h2', '', 'Générateur de scene', this.module);

        const desc = `Après avoir imaginé le contexte de la scène que l'on veut jouer, on lance un D10 contre l'indicateur de chaos (remplir ci-dessous). Si le résultat est supérieur à l'indicateur de charos, on joue la scène normalement, sinon selon si le résultat est paire ou impaire, la scène sera plus ou moins modifiée. On peut utiliser le tableau pour obtenir des informations sur les changements qui ont lieu ou pour s'inspirer si on a pas d'idée de scène.`;
        create.element('p', '', desc, this.module);

        create.hr(this.module)
        // CHAOS
        this.chaosTitle = create.element('h3', '', 'Chaos', this.module);
        this.chaos = create.element('input', 'sceneChaos', '', this.chaosTitle);
        this.chaos.setAttribute('type', 'text')
        this.chaos.value = '5'
        create.hr(this.module)

        this.moduleContent2 = create.element('div', 'moduleContent2', '', this.module);
        
        // COLUMN ONE
        this.col1 = create.element('div', '', '', this.moduleContent2);
        // RESULT and BUTTON
        this.mod = create.element('h3', '', 'Scène modifiée ?', this.col1);
        this.result = create.element('div', 'result', '...', this.col1);
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.col1);
        this.rollBtn.classList.add('rollBtn')

        // COLUMN TWO
        this.col2 = create.element('div', '', '', this.moduleContent2);
        this.infoTable = document.createElement('table');
        create.row(this.infoTable, `Type`, this.eventType, 0);
        create.row(this.infoTable, `Mots clefs`, this.keyWords, 1);
        create.row(this.infoTable, `Sens`, this.meaning, 2);
        this.col2.appendChild(this.infoTable);
        // BUTTON
        this.dataBtn = create.element('button', 'dataBtn', 'Roll', this.col2);
        this.dataBtn.classList.add('rollBtn')


        this.content.appendChild(this.module);
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

        this.dataBtn.addEventListener('click', () => {
            this.roll();
        });
    }
}

export { sceneGenerator }