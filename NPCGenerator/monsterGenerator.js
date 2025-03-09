import { roll, getMoney } from "/src/utils.js";
import { StatBlock } from "./statGenerator";
import monsterGeneratorData from './monsterGeneratorData.json' assert { type: 'json'};

class Monster {
    constructor() {
        this.type = { name: 'Type', value: this.rollType() };
        this.size = { name: 'Taille', value: this.rollSize() };
        this.quantity = { name: 'Quantité', value: this.rollQuantity() };
        this.stats = new StatBlock('monster');
    }

    get desc() {
        return { name: 'Description', value: ''};

    }

    // METHODS
    rollType() {
        const types = Object.keys(monsterGeneratorData.type)
        const rollType = roll.from(types);
        
        let rollDesc = this.rollTypeDesc(rollType);
        let text = rollDesc.text;
        let creatureDesc = rollDesc.desc;
        
        while (typeof creatureDesc === 'object') {
            const newType = Object.values(creatureDesc).toString();
            const newDesc = this.rollTypeDesc(newType)
            creatureDesc = newDesc.desc;
        }
        
        return {
            name: text,
            desc: creatureDesc
        }
    }
    rollTypeDesc(type) {
        const rollDesc = {
            other: roll.from(monsterGeneratorData.type.other),
            animal: roll.from(monsterGeneratorData.type.animal),
            machine : roll.from(monsterGeneratorData.type.machine),
            elemental : roll.from(monsterGeneratorData.type.elemental),
            humanoid : roll.from(monsterGeneratorData.type.humanoid),
            supernatural : roll.from(monsterGeneratorData.type.supernatural),
            shapeless : roll.from(monsterGeneratorData.type.shapeless),
            plant : roll.from(monsterGeneratorData.type.plant),
            undead : roll.from(monsterGeneratorData.type.undead),
            insect : roll.from(monsterGeneratorData.type.insect)
        } 
        let text; 
        let desc;

        if (type == 'other') {
            text = `D'un autre monde`;
            desc = rollDesc.other;
        } else if (type == 'animal') {
            text = `Animal`;
            desc = rollDesc.animal;
        } else if (type == 'machine') {
            text = `Machine`;
            desc = rollDesc.machine;
        } else if (type == 'elemental') {
            text = `Elémental`;
            desc = rollDesc.elemental;
        } else if (type == 'humanoid') {
            text = `Humanoïde`;
            desc = rollDesc.humanoid;
        } else if (type == 'supernatural') {
            text = `Bête surnaturelle`;
            desc = rollDesc.supernatural;
        } else if (type == 'shapeless') {
            text = `Informe`;
            desc = rollDesc.shapeless;
        } else if (type == 'plant') {
            text = `Plante`;
            desc = rollDesc.plant;
        } else if (type == 'undead') {
            text = `Mort-vivant`;
            desc = rollDesc.undead;
        } else if (type == 'insect') {
            text = `Insecte`;
            desc = rollDesc.insect;
        } 

        return { text, desc }
    }
    rollSize() {
        const chance = roll.d100();
        let size; 

        if (chance <= 5) {
            size = {en: 'Tiny', fr: 'Minuscule'};
        } else if (chance > 5 && chance <= 20) {
            size = {en: 'Small', fr: 'Petite'};
        } else if (chance > 20 && chance <= 70) {
            size = {en: 'Human size', fr: 'Taille humaine'};
        } else if (chance > 70 && chance <= 85) {
            size = {en: 'Big', fr: 'Grande'};
        } else if (chance > 85 && chance <= 95) {
            size = {en: 'Huge', fr: 'Très grande'};
        } else if (chance > 95) {
            size = {en: 'Gigantic', fr: 'Gigantesque'};
        }

        return size
    }
    rollQuantity() {
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
    }
}

export { Monster }