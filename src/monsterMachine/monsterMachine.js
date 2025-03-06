import { roll, create } from "/src/utils.js";
import monsterMachineData from './monsterMachineData.json' assert { type: 'json'};

const monsterGenerator = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.roll(),
        this.bindEvents();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'monsterMachine');
        this.title = create.element('h1', '', 'Machine à Monstres', this.module);
        
        this.infoTable = document.createElement('table');
        create.row(this.infoTable, `Type`, '', 0);
        create.row(this.infoTable, `Description`, '', 1);
        create.row(this.infoTable, `Taile`, '', 2);
        create.row(this.infoTable, `Quantité`, '', 3);
        create.row(this.infoTable, `Niveau`, '', 4);
        this.module.appendChild(this.infoTable);

        // BUTTON
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);

        this.webPage.appendChild(this.module);
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        })
    },
    roll() {
        const type = this.getType()

        this.infoTable.rows[0].cells[1].innerHTML = type[0];
        this.infoTable.rows[1].cells[1].innerHTML = type[1];
        this.infoTable.rows[2].cells[1].innerHTML = this.getSize();
        this.infoTable.rows[3].cells[1].innerHTML = this.getQuantity();
        this.infoTable.rows[4].cells[1].innerHTML = this.getLevel();
    },
    getType() {
        const types = Object.keys(monsterMachineData.type)
        const type = roll.from(types);

        const desc = 'sup'

        return { type, desc }
    },
    getSize() {
        const chance = roll.d100();
        let size; 

        if (chance <= 5) {
            size = 'Minuscule';
        } else if (chance > 5 && chance <= 20) {
            size = 'Petite';
        } else if (chance > 20 && chance <= 70) {
            size = 'Taille humaine';
        } else if (chance > 70 && chance <= 85) {
            size = 'Grande';
        } else if (chance > 85 && chance <= 95) {
            size = 'Très grande';
        } else if (chance > 95) {
            size = 'Gigantesque';
        }

        return size
    },
    getQuantity() {
        const chance = roll.d20();
        let quantity; 

        if (chance <= 10) {
            quantity = 1;
        } else if (chance > 10 && chance <= 14) {
            quantity = 2;
        } else if (chance > 14 && chance <= 16) {
            quantity = 3;
        } else if (chance > 16 && chance <= 19) {
            quantity = 4;
        } else if (chance > 19 && chance <= 20) {
            quantity = 5;
        } else if (chance > 20) {
            quantity = '6 et plus';
        }

        return quantity
    },
    getLevel() {
        return roll.from(monsterMachineData.level)
    }
}

export { monsterGenerator }