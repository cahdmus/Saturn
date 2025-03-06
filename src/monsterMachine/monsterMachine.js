import { roll, create } from "/src/utils.js";
import monsterMachineData from './monsterMachineData.json' assert { type: 'json'};
import { capacity } from "../capacity/capacity";

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

        create.hr(this.module)

        // CAPACITY STATS
        capacity.init(this.module)

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
        const monsterType = this.getType()
        this.infoTable.rows[0].cells[1].innerHTML = monsterType.type;
        this.infoTable.rows[1].cells[1].innerHTML = monsterType.desc;
        this.infoTable.rows[2].cells[1].innerHTML = this.getSize();
        this.infoTable.rows[3].cells[1].innerHTML = this.getQuantity();
        this.infoTable.rows[4].cells[1].innerHTML = this.getLevel();
    },
    getType() {
        const types = Object.keys(monsterMachineData.type)
        const rollType = roll.from(types);
        
        let rollDesc = this.getDesc(rollType);
        let text = rollDesc.text;
        let creatureDesc = rollDesc.desc;
        
        
        while (typeof creatureDesc === 'object') {
            const newType = Object.values(creatureDesc).toString();
            const newDesc = this.getDesc(newType)
            creatureDesc = newDesc.desc;
        }
        
        return {
            type: text,
            desc: creatureDesc
        }
    },
    rollDesc() {
        return {
            other: roll.from(monsterMachineData.type.other),
            animal: roll.from(monsterMachineData.type.animal),
            machine : roll.from(monsterMachineData.type.machine),
            elemental : roll.from(monsterMachineData.type.elemental),
            humanoid : roll.from(monsterMachineData.type.humanoid),
            supernatural : roll.from(monsterMachineData.type.supernatural),
            shapeless : roll.from(monsterMachineData.type.shapeless),
            plant : roll.from(monsterMachineData.type.plant),
            undead : roll.from(monsterMachineData.type.undead),
            insect : roll.from(monsterMachineData.type.insect)
        } 
    },
    getDesc(type) {
        let text; 
        let desc;

        if (type == 'other') {
            text = `D'un autre monde`;
            desc = this.rollDesc().other;
        } else if (type == 'animal') {
            text = `Animal`;
            desc = this.rollDesc().animal;
        } else if (type == 'machine') {
            text = `Machine`;
            desc = this.rollDesc().machine;
        } else if (type == 'elemental') {
            text = `Elémental`;
            desc = this.rollDesc().elemental;
        } else if (type == 'humanoid') {
            text = `Humanoïde`;
            desc = this.rollDesc().humanoid;
        } else if (type == 'supernatural') {
            text = `Bête surnaturelle`;
            desc = this.rollDesc().supernatural;
        } else if (type == 'shapeless') {
            text = `Informe`;
            desc = this.rollDesc().shapeless;
        } else if (type == 'plant') {
            text = `Plante`;
            desc = this.rollDesc().plant;
        } else if (type == 'undead') {
            text = `Mort-vivant`;
            desc = this.rollDesc().undead;
        } else if (type == 'insect') {
            text = `Insecte`;
            desc = this.rollDesc().insect;
        } 

        return { text, desc }
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