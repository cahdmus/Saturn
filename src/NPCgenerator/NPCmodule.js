import NPCdata from './NPCdata.json' assert { type: 'json' };
import { roll, getMoney } from "/src/utils.js";

class NPC {
    constructor(firstName, surname, gender, socialClass, age, attitude, motivations,
        focus, archetypes, speciality, avatar) {

        this.firstName = firstName;
        this.surname = surname;
        this.gender = gender;
        this.socialClass = socialClass;
        this.age = age;
        this.attitude = attitude;
        this.motivations = motivations;
        this.focus = focus;
        this.archetypes = archetypes;
        this.speciality = speciality;
        this.avatar = avatar;
    }
}

const NPCgenerator = {
    init() {
        this.gender = this.getGender();
        this.firstName = this.getName(this.gender);
        this.surname = this.getSurname();
        this.socialClass = this.getSocialClass();
        this.age = this.getAge();
        this.attitude = this.getAttitude();
        this.motivations = this.getMotivations();
        this.focus = this.getFocus();
        this.archetypes = this.getArchetypes();
        this.speciality = this.getSpeciality();
        this.avatar = this.getAvatar(this.gender, this.socialClass.socialClass);

        return new NPC(this.firstName, this.surname, this.gender[0], this.socialClass, 
            this.age, this.attitude, this.motivations, this.focus, this.archetypes, 
            this.speciality, this.avatar)
    },
    getGender() {
        const chance = roll.d100();

        if (chance <= 10) {
            return 'neutral';
        } else if (chance > 10 && chance <= 55) {
            return 'F';
        } else if (chance > 55 && chance <= 100) {
            return 'M';
        }
    },
    getName(gender) {
        const allNames = NPCdata.names;
        const newNameList = []
        let name;

        if (gender.includes('neutral')) {
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
    },
    getSurname() {
        const prefix = roll.from(NPCdata.surnames.prefix);
        const sufix = roll.from(NPCdata.surnames.sufix);

        return prefix + sufix;
    },
    getSocialClass() {
        const chance = roll.d100();
        let socialClass;
        let gold;

        if (chance <= 5) {
            socialClass = 'pauper';
        } else if (chance > 5 && chance <= 30) {
            socialClass = 'poor';
        } else if (chance > 30 && chance <= 80) {
            socialClass = 'middle class';
        } else if (chance > 80 && chance <= 95) {
            socialClass = 'rich';
        } else if (chance > 95 && chance <= 100) {
            socialClass = 'elite';
        }

        gold = getMoney(socialClass);
        
        return { socialClass, gold }
    },
    getAge() {
        const chance = roll.d100();

        if (chance <= 10) {
            return 'child';
        } else if (chance > 10 && chance <= 25) {
            return 'teen';
        } else if (chance > 25 && chance <= 50) {
            return 'young adult';
        } else if (chance > 50 && chance <= 80) {
            return 'adult';
        } else if (chance > 80 && chance <= 100) {
            return 'old';
        }
    },
    getAttitude() {
        return roll.from(NPCdata.attitude)
    },
    getMotivations() {
        const verb = roll.from(NPCdata.motivations.verb)
        const noun = roll.from(NPCdata.motivations.noun)
        return `${verb} ${noun}`;
    },
    getFocus() {
        return roll.from(NPCdata.focus)
    },
    getArchetypes() {
        const getAnimal = roll.from(NPCdata.archetype.animal);
        const animal = `${getAnimal.name} : ${getAnimal.traits}`

        const role = roll.from(NPCdata.archetype.role);
        const descriptor = roll.from(NPCdata.archetype.descriptor);
        const main = `${role} ${descriptor}`

        return { main, animal }
    },
    getSpeciality() {
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
    },
    getAvatar(gender, socialClass) {
        const allImages = NPCdata.images;
        let genderedList = allImages.filter((image) => image.tags.gender.includes(gender));
        let socialFilteredList = genderedList.filter((image) => image.tags.socialClass.includes(socialClass));

        const avatar = roll.from(socialFilteredList);
        
        return avatar.url
    }
}

export { NPCgenerator }