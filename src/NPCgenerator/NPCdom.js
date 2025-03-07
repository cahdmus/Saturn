import { NPCgenerator } from "./NPCmodule";
import avatar from "/home/cahdmus/repos/Saturn/src/NPCgenerator/images/Avatar/9c24b783041ebecc0028853c3b8cad71.jpg"
import animal from "/home/cahdmus/repos/Saturn/src/NPCgenerator/images/Animal/coq.png"
import { capacity } from "../capacity/capacity";
import { create } from "../utils";

const displayNPC = {
    NPC: NPCgenerator.init(),
    init() {
        // console.log(this.NPC);
        this.cacheDOM();
        this.generateDOM();
        this.roll();
        this.bindEvents();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content')
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        // this.module.classList.add('npcGenerator');
        this.module.setAttribute('id', 'npcGenerator');
        this.webPage.appendChild(this.module);

        // AVATAR
        this.avatarContainer = create.element('div', '', '', this.module);
        this.avatarContainer.classList.add('avatarContainer');
        this.avatarImg = create.element('img', '', '', this.avatarContainer);
        this.avatarImg.setAttribute('src', avatar);

        // NAME
        this.name = create.element('h1', '', '', this.module)
        
        // MAIN ARCHETYPE
        this.mainArchetype = create.element('h3', '', '', this.module)

        // ANIMAL ARCHETYPE
        this.animalArchetype = create.element('div', '', '', this.module)
        this.animalArchetype.classList.add('animalArchetype');

        // -- animal name
        this.animalTitle = create.element('p', '', '', this.animalArchetype)
        this.animalTitle.classList.add('title');
        this.animalDesc = create.element('p', '', '', this.animalArchetype)
        this.animalDesc.classList.add('animalDesc');

        // -- animal image
        this.animalImg = create.element('img', '', '', this.animalDesc)
        this.animalImg.setAttribute('src', animal);
        
        // -- animal text
        this.animalTextContainer = create.element('div', '', '', this.animalDesc)
        this.animalTextContainer.classList.add('animalTextContainer');
        this.animalText = create.element('p', '', '', this.animalTextContainer)
        this.animalText.classList.add('desc');

        // NPC REST OF INFOS
        create.hr(this.module)
        
        this.infoTable = document.createElement('table');
        create.row(this.infoTable, `Âge`, '', 0);
        create.row(this.infoTable, `Genre`, '', 1);
        create.row(this.infoTable, `Classe sociale`, '', 2);
        create.row(this.infoTable, `Pièces d'argent`, '', 3);
        create.row(this.infoTable, `Attitude`, '', 4);
        create.row(this.infoTable, `Apparence`, '', 5);
        create.row(this.infoTable, `Motivations`, '', 6);
        create.row(this.infoTable, `Focus`, '', 7);
        create.row(this.infoTable, `Spécialité`, '', 8);
        this.module.appendChild(this.infoTable);

        // BUTTON
        this.rollBtn = create.element('button', 'npcRollBtn', 'Roll', this.module);
        this.rollBtn.classList.add('rollBtn');

        // CAPACITY STATS
        capacity.init(this.module, 'npc', this.NPC.level)
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        })
    },
    roll() {
        this.NPC = NPCgenerator.init()
        // console.log(this.NPC)

        this.name.innerHTML = `${this.NPC.firstName} ${this.NPC.surname}`
        this.mainArchetype.innerHTML = this.NPC.archetypes.main

        this.animalTitle.innerHTML = this.NPC.archetypes.animal.name
        this.animalText.innerHTML = this.NPC.archetypes.animal.traits

        this.infoTable.rows[0].cells[1].innerHTML = this.NPC.age
        this.infoTable.rows[1].cells[1].innerHTML = this.NPC.gender
        this.infoTable.rows[2].cells[1].innerHTML = this.NPC.socialClass.socialClass
        this.infoTable.rows[3].cells[1].innerHTML = this.NPC.socialClass.gold
        this.infoTable.rows[4].cells[1].innerHTML = this.NPC.attitude
        this.infoTable.rows[5].cells[1].innerHTML = this.NPC.appearance
        this.infoTable.rows[6].cells[1].innerHTML = this.NPC.motivations
        this.infoTable.rows[7].cells[1].innerHTML = this.NPC.focus
        this.infoTable.rows[8].cells[1].innerHTML = this.formatSpeciality(this.NPC.speciality)
    },
    formatSpeciality(speciality) {
        if (typeof speciality !== 'object') {
            return speciality
        } else {
            return `${speciality.name}<br><span>${speciality.desc}</span>`
        }
    }
}

export { displayNPC }