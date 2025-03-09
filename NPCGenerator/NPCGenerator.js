import { roll, getMoney } from "/utils.js";
import { StatBlock } from "./statGenerator.js";
import NPCdata from './NPCdata.json' with { type: 'json'};

class NPC {
    constructor() {
        this.gender = { name: 'Genre', value: this.rollGender() };
        this.firstName = { name: 'Prénom', value: this.rollName(this.gender.value.short) };
        this.surname = { name: 'Nom de famille', value: this.rollSurname() };
        this.socialClass = { name: 'Classe Sociale', value: this.rollSocialClass() };
        this.age = { name: 'Âge', value: this.rollAge() };
        this.attitude = { name: 'Attitude', value: roll.from(NPCdata.attitude) };
        this.appearance = { name: 'Appareance', value: roll.from(NPCdata.appearance) };
        this.motivations = { name: 'Motivations', value: this.rollMotivations() };
        this.focus = { name: 'Focus', value: roll.from(NPCdata.focus) };
        this.archetypes = { name: 'Archétypes', value: this.rollArchetypes() };
        this.speciality = { name: 'Spécialité', value: this.rollSpeciality() };
        this.stats = this.rollStats(this.archetypes.value.animal.name);
    }

    get gold() {
        return getMoney(this.socialClass.value.en)
    }

    get fullname() {
        return `${this.firstName.value} ${this.surname.value}`
    }

    get avatar() {
        const gender = this.gender.value.short;
        const socialClass = this.socialClass.value.en;
        const allImages = NPCdata.images;
        let genderedList = allImages.filter((image) => image.tags.gender.includes(gender));
        let socialFilteredList = genderedList.filter((image) => image.tags.socialClass.includes(socialClass));
        const avatar = roll.from(socialFilteredList);
        
        return avatar.url
    }

    // METHODS
    rollGender() {
        const chance = roll.d100();
        let full;
        let short;

        if (chance <= 10) {
            full = 'Neutre';
            short = 'N';
        } else if (chance > 10 && chance <= 55) {
            full = 'Femme';
            short = 'F';
        } else if (chance > 55 && chance <= 100) {
            full = 'Homme';
            short = 'M';
        }

        return { full, short }
    }
    rollName(gender) {
        const allNames = NPCdata.names;
        const newNameList = []
        let name;

        if (gender.includes('N')) {
            name = roll.from(allNames).name;
        } else {
            allNames.forEach((name) => {
                if (name.genders.includes(gender)) {
                    newNameList.push(name);
                }
            }),
                name = roll.from(newNameList).name;
        }

        return name
    }
    rollSurname() {
        const prefix = roll.from(NPCdata.surnames.prefix);
        const sufix = roll.from(NPCdata.surnames.sufix);

        return prefix + sufix;
    }
    rollSocialClass() {
        const chance = roll.d100();

        if (chance <= 5) {
            return { en: 'pauper', fr: 'Miséreux' };
        } else if (chance > 5 && chance <= 30) {
            return { en: 'poor', fr: 'Pauvre' };
        } else if (chance > 30 && chance <= 80) {
            return { en: 'middle class', fr: 'Classe moyenne' };
        } else if (chance > 80 && chance <= 95) {
            return { en: 'rich', fr: 'Riche' };
        } else if (chance > 95 && chance <= 100) {
            return { en: 'elite', fr: 'Elite' };
        }
    }
    rollAge() {
        const chance = roll.d100();

        if (chance <= 10) {
            return { en: 'child', fr: 'Enfant' };
        } else if (chance > 10 && chance <= 25) {
            return { en: 'teen', fr: 'Adolescent' };
        } else if (chance > 25 && chance <= 50) {
            return { en: 'young adult', fr: 'Jeune adulte' };
        } else if (chance > 50 && chance <= 80) {
            return { en: 'adult', fr: 'Adulte' };
        } else if (chance > 80 && chance <= 100) {
            return { en: 'old', fr: 'Vieux' };
        }
    }
    rollMotivations() {
        const verb = roll.from(NPCdata.motivations.verb)
        const noun = roll.from(NPCdata.motivations.noun)
        return `${verb} ${noun}`;
    }
    rollArchetypes() {
        const animal = roll.from(NPCdata.archetype.animal);

        const role = roll.from(NPCdata.archetype.role);
        const descriptor = roll.from(NPCdata.archetype.descriptor);
        const main = `${role} ${descriptor}`

        return { main, animal }
    }
    rollSpeciality() {
        if (roll.d20() <= 4) {
            const speciality = roll.from(NPCdata.speciality);
            if (speciality.name === "Mutation") {
                return roll.from(NPCdata.speciality[3].type)
            } else {
                return speciality
            }
        } else {
            return 'no speciality';
        }
    }
    rollStats(animal) {
        let NPCstatBlock = new StatBlock();

        switch (animal) {
            case 'Aigle':
                this.updateSkill(NPCstatBlock.VOL, 5)
                break
            case 'Chat':
                this.updateSkill(NPCstatBlock.MVT, 5)
                this.updateSkill(NPCstatBlock.DIS, 5)
                this.randomSkill(NPCstatBlock.FOR, NPCstatBlock.VOL, -5)
                break
            case 'Chien':
                this.randomSkill(NPCstatBlock.END, NPCstatBlock.PER, 5)
                this.updateSkill(NPCstatBlock.SOC, 5)
                this.updateSkill(NPCstatBlock.DIS, -5)
                break
            case 'Coq':
                this.updateSkill(NPCstatBlock.COM, 5)
                this.updateSkill(NPCstatBlock.SOC, 5)
                this.randomSkill(NPCstatBlock.DIS, NPCstatBlock.CNS, -5)
                break
            case 'Corbeau':
                this.randomSkill(NPCstatBlock.DIS, NPCstatBlock.SRV, 5)
                this.updateSkill(NPCstatBlock.VOL, 5)
                this.updateSkill(NPCstatBlock.SOC, -5)
                break
            case 'Fourmi':
                this.updateSkill(NPCstatBlock.HAB, 5)
                this.updateSkill(NPCstatBlock.VOL, 5)
                this.updateSkill(NPCstatBlock.END, -5)
                break
            case 'Hibou':
                this.updateSkill(NPCstatBlock.CNS, 5)
                break
            case 'Lapin':
                this.updateSkill(NPCstatBlock.DIS, 5)
                this.updateSkill(NPCstatBlock.MVT, 5)
                this.updateSkill(NPCstatBlock.PER, 5)
                this.updateSkill(NPCstatBlock.COM, -5)
                this.updateSkill(NPCstatBlock.FOR, -5)
                break
            case 'Lion':
                this.updateSkill(NPCstatBlock.COM, 5)
                this.updateSkill(NPCstatBlock.FOR, 5)
                this.updateSkill(NPCstatBlock.SOC, 5)
                this.updateSkill(NPCstatBlock.CNS, -5)
                this.updateSkill(NPCstatBlock.DIS, -5)
                break
            case 'Loup':
                this.updateSkill(NPCstatBlock.COM, 5)
                this.randomSkill(NPCstatBlock.PER, NPCstatBlock.SRV, 5)
                this.updateSkill(NPCstatBlock.SOC, -5)
                break
            case 'Mouton':
                this.updateSkill(NPCstatBlock.HAB, 5)
                this.updateSkill(NPCstatBlock.PER, 5)
                this.updateSkill(NPCstatBlock.SOC, 5)
                this.updateSkill(NPCstatBlock.COM, -5)
                this.updateSkill(NPCstatBlock.VOL, -5)
                break
            case 'Ours':
                this.updateSkill(NPCstatBlock.FOR, 10)
                this.updateSkill(NPCstatBlock.SOC, -5)
                break
            case 'Porc':
                this.updateSkill(NPCstatBlock.FOR, 5)
                this.updateSkill(NPCstatBlock.END, 5)
                this.randomSkill(NPCstatBlock.MVT, NPCstatBlock.CNS, -5)
                break
            case 'Rat':
                this.updateSkill(NPCstatBlock.DIS, 5)
                this.randomSkill(NPCstatBlock.VOL, NPCstatBlock.SRV, 5)
                this.updateSkill(NPCstatBlock.FOR, -5)
                break
            case 'Renard':
                this.updateSkill(NPCstatBlock.MVT, 5)
                this.updateSkill(NPCstatBlock.SOC, 5)
                this.randomSkill(NPCstatBlock.COM, NPCstatBlock.FOR, -5)
                break
            case 'Serpent':
                this.randomSkill(NPCstatBlock.CNS, NPCstatBlock.SOC, 5)
                this.updateSkill(NPCstatBlock.VOL, 5)
                this.updateSkill(NPCstatBlock.MVT, -5)
                break
            case 'Singe':
                this.updateSkill(NPCstatBlock.MVT, 5)
                this.updateSkill(NPCstatBlock.SOC, 5)
                this.randomSkill(NPCstatBlock.COM, NPCstatBlock.VOL, -5)
                break
            case 'Souris':
                this.updateSkill(NPCstatBlock.DIS, 10)
                this.updateSkill(NPCstatBlock.SOC, 5)
                this.updateSkill(NPCstatBlock.COM, -5)
                this.updateSkill(NPCstatBlock.FOR, -5)
                break
            case 'Taureau':
                this.updateSkill(NPCstatBlock.COM, 5)
                this.updateSkill(NPCstatBlock.FOR, 10)
                this.updateSkill(NPCstatBlock.DIS, -5)
                this.updateSkill(NPCstatBlock.CNS, -5)
                break
            case 'Vautour':
                this.updateSkill(NPCstatBlock.CNS, 5)
                this.updateSkill(NPCstatBlock.END, 5)
                this.updateSkill(NPCstatBlock.SOC, -5)
                break
            case 'Âne':
                this.updateSkill(NPCstatBlock.END, 5)
                this.randomSkill(NPCstatBlock.SRV, NPCstatBlock.VOL, 5)
                this.randomSkill(NPCstatBlock.COM, NPCstatBlock.TIR, -5)
                break
            case 'Cerf':
                this.updateSkill(NPCstatBlock.SOC, 5)
                this.updateSkill(NPCstatBlock.VOL, 5)
                this.randomSkill(NPCstatBlock.DIS, NPCstatBlock.TIR, -5)
                break
            case 'Hyène':
                this.randomSkill(NPCstatBlock.COM, NPCstatBlock.TIR, 5)
                this.updateSkill(NPCstatBlock.DIS, 5)
                this.randomSkill(NPCstatBlock.FOR, NPCstatBlock.VOL, -5)
                break
            case 'Paon':
                this.randomSkill(NPCstatBlock.CNS, NPCstatBlock.PER, 5)
                this.updateSkill(NPCstatBlock.SOC, 5)
                this.randomSkill(NPCstatBlock.COM, NPCstatBlock.FOR, -5)
                break
        }

        return NPCstatBlock
    }
    updateSkill(skill, bonus) {
        // console.log(`with a bonus of ${bonus} ${skill.name} went from ${skill.value} to ${skill.value + bonus}`);
        return skill.value = skill.value + bonus
    }
    randomSkill(skill1, skill2, bonus) {
        let chance = roll.d2()
        // console.log(this.archetype)
        // console.log(skill1)
        // console.log(skill2)
        return (chance === 1) ? this.updateSkill(skill1, bonus) : this.updateSkill(skill2, bonus);
    }
}

export { NPC }