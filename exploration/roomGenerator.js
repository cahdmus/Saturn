import { roll, create } from "../utils.js";
import explorationData from './explorationData.json' with { type: 'json' };

const roomGenerator = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.roll(),
        this.bindEvents();
    },
    cacheDOM() {
        this.content = document.querySelector('#exploContent');
        this.cells = document.querySelectorAll('#sceneGenerator table .value')
    },
    roll() {
        this.roomTable.rows[0].cells[1].innerHTML = roll.from(explorationData.interior.size);
        this.roomTable.rows[1].cells[1].innerHTML = roll.from(explorationData.interior.type);
        this.roomTable.rows[2].cells[1].innerHTML = roll.from(explorationData.interior.doors);
        this.roomTable.rows[3].cells[1].innerHTML = roll.from(explorationData.interior.behindDoor);
        this.roomTable.rows[4].cells[1].innerHTML = roll.from(explorationData.interior.stairs);
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        })
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('roomGenerator');
        this.title = create.element('h2', '', 'Générateurs de salle', this.module);


        this.roomTable = document.createElement('table');
        create.row(this.roomTable, `Taille de la pièce`, '', 0);
        create.row(this.roomTable, `Type de pièce`, '', 1);
        create.row(this.roomTable, `Sorties`, '', 2);
        create.row(this.roomTable, `Derrière la sortie`, '', 3);
        create.row(this.roomTable, `Escalier etc.`, '', 4);
        this.module.appendChild(this.roomTable);

        // BUTTON
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);
        this.rollBtn.classList.add('rollBtn');

        this.content.appendChild(this.module);
    }
}

export { roomGenerator }