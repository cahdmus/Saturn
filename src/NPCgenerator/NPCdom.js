import { NPCgenerator } from "./NPCmodule";
import avatar from "/home/cahdmus/repos/Saturn/src/NPCgenerator/images/Avatar/9c24b783041ebecc0028853c3b8cad71.jpg"
import animal from "/home/cahdmus/repos/Saturn/src/NPCgenerator/images/Animal/coq.png"

const displayNPC = {
    NPC: NPCgenerator.init(),
    init() {
        console.log(this.NPC);
        this.cacheDOM();
        this.generateDOM();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content')
    },
    generateDOM() {
        // THE BOX
        this.module = document.createElement('div');
        this.module.classList.add('module', 'npcGenerator');

        // AVATAR
        this.avatarContainer = document.createElement('div');
        this.avatarContainer.classList.add('avatarContainer');
        this.avatarImg = document.createElement('img');
        this.avatarImg.setAttribute('src', avatar);
        this.avatarContainer.appendChild(this.avatarImg);
        this.module.appendChild(this.avatarContainer);

        // NAME
        this.name = document.createElement('h1');
        this.name.innerHTML = `${this.NPC.firstName} ${this.NPC.surname}`;
        this.module.appendChild(this.name);

        // MAIN ARCHETYPE
        this.mainArchetype = document.createElement('h3');
        this.mainArchetype.innerHTML = this.NPC.archetypes.main;
        this.module.appendChild(this.mainArchetype);

        // ANIMAL ARCHETYPE
        this.animalArchetype = document.createElement('div');
        this.animalArchetype.classList.add('animalArchetype');

        // -- animal name
        this.animalTitle = document.createElement('p');
        this.animalTitle.classList.add('title');
        this.animalTitle.innerHTML = this.NPC.archetypes.animal.name;
        this.animalArchetype.appendChild(this.animalTitle);
        
        this.animalDesc = document.createElement('div');
        this.animalDesc.classList.add('animalDesc');
        
        // -- animal image
        this.animalImg = document.createElement('img');
        this.animalImg.setAttribute('src', animal);
        this.animalDesc.appendChild(this.animalImg);
        
        // -- animal text
        this.animalTextContainer = document.createElement('div');
        this.animalTextContainer.classList.add('animalTextContainer');
        this.animalText = document.createElement('p');
        this.animalText.classList.add('desc');
        this.animalText.innerHTML = this.NPC.archetypes.animal.traits;
        this.animalTextContainer.appendChild(this.animalText);        
        this.animalDesc.appendChild(this.animalTextContainer);        
        
        this.animalArchetype.appendChild(this.animalDesc);

        this.module.appendChild(this.animalArchetype);
        
        // NPC REST OF INFOS
        this.appendSeparator();
        this.infoTable = document.createElement('table');
        
        this.createRow(this.infoTable, `Âge`, this.NPC.age, 0);
        this.createRow(this.infoTable, `Genre`, this.NPC.gender, 1);
        this.createRow(this.infoTable, `Classe sociale`, this.NPC.socialClass.socialClass, 2);
        this.createRow(this.infoTable, `Pièces d'argent`, this.NPC.socialClass.gold, 3);
        this.createRow(this.infoTable, `Attitude`, this.NPC.attitude, 4);
        this.createRow(this.infoTable, `Apparence`, this.NPC.appearance, 5);
        this.createRow(this.infoTable, `Motivations`, this.NPC.motivations, 6);
        this.createRow(this.infoTable, `Focus`, this.NPC.focus, 7);
        this.createRow(this.infoTable, `Spécialité`, this.NPC.speciality, 8);
        
        this.module.appendChild(this.infoTable);
        
        // STATS
        this.appendSeparator();
        this.stats = document.createElement('h1');
        this.stats.innerHTML = 'Caractéristiques';
        this.module.appendChild(this.stats);
        
        this.infoTable = document.createElement('table');
        this.createRow(this.infoTable, `Combat`, 'uc', 0);
        this.createRow(this.infoTable, `Connaisances`, 'uc', 1);
        this.createRow(this.infoTable, `Discrétion`, 'uc', 2);
        this.createRow(this.infoTable, `Endurance`, 'uc', 3);
        this.createRow(this.infoTable, `Force`, 'uc', 4);
        this.createRow(this.infoTable, `Habileté`, 'uc', 5);
        this.createRow(this.infoTable, `Magie`, 'uc', 6);
        this.createRow(this.infoTable, `Mouvement`, 'uc', 7);
        this.createRow(this.infoTable, `Perception`, 'uc', 8);
        this.createRow(this.infoTable, `Sociabilité`, 'uc', 9);
        this.createRow(this.infoTable, `Survie`, 'uc', 10);
        this.createRow(this.infoTable, `Tir`, 'uc', 11);
        this.createRow(this.infoTable, `Volonté`, 'uc', 12);
        this.module.appendChild(this.infoTable);
        
        this.scoreTable = document.createElement('table');
        this.scoreTable.classList.add('smallTable');
        this.createRow(this.scoreTable, `Niveau`, 'uc', 0);
        this.createRow(this.scoreTable, `Points de vie`, 'uc', 1);
        this.createRow(this.scoreTable, `Bonus de force`, 'uc', 2);
        this.module.appendChild(this.scoreTable);
        
        this.webPage.appendChild(this.module);
    },
    createRow(table, title, value, position) {
        const row = table.insertRow(position);
        const titleCell = row.insertCell(0);
        titleCell.classList.add('title');
        titleCell.innerHTML = title;
        const descCell = row.insertCell(1);
        descCell.classList.add('value');
        descCell.innerHTML = value;
    },
    appendSeparator() {
        this.hr = document.createElement('hr');
        this.module.appendChild(this.hr);
    }
}

export { displayNPC }