import { NPC } from "./NPCGenerator";
import { create } from "../utils";
import avatar from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Avatar/9c24b783041ebecc0028853c3b8cad71.jpg"
import Aigle from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/aigle.jpg"
import Âne from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/ane.jpg"
import Cerf from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/cerf.png"
import Chat from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/chat.jpg"
import Chien from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/chien.jpg"
import Coq from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/coq.png"
import Corbeau from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/corbeau.jpg"
import Fourmi from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/fourmi.png"
import Hibou from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/hibou.png"
import Hyène from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/hyene.png"
import Lapin from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/lapin.jpg"
import Lion from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/lion.jpg"
import Loup from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/loup.jpg"
import Mouton from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/mouton.jpg"
import Ours from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/ours.png"
import Paon from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/paon.jpg"
import Porc from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/porc.jpg"
import Rat from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/rat.jpg"
import Renard from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/renard.jpg"
import Serpent from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/serpent.jpg"
import Souris from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/souris.png"
import Taureau from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/taureau.png"
import Vautour from "/home/cahdmus/repos/Saturn/src/NPCGenerator/images/Animal/vautour.jpg"

const displayModuleNPC = {
    init(title, id) {
        this.title = title;
        this.id = id;
        this.cacheDOM();
        this.generateDOM();
        this.roll();
        this.bindEvents();
        // console.log(this.content.avatar)
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.classList.add('npcGenerator');
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
        // this.animalImg.setAttribute('src', Ours);


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

        // STATS
        this.stats = create.element('h1', '', 'Caractéristiques', this.module);
        this.subtitle = create.element('h3', '', '', this.module);

        this.scoreTable = document.createElement('table');
        this.scoreTable.setAttribute('id', '');
        create.row(this.scoreTable, `Combat`, '', 0);
        create.row(this.scoreTable, `Connaisances`, '', 1);
        create.row(this.scoreTable, `Discrétion`, '', 2);
        create.row(this.scoreTable, `Endurance`, '', 3);
        create.row(this.scoreTable, `Force`, '', 4);
        create.row(this.scoreTable, `Habileté`, '', 5);
        create.row(this.scoreTable, `Magie`, '', 6);
        create.row(this.scoreTable, `Mouvement`, '', 7);
        create.row(this.scoreTable, `Perception`, '', 8);
        create.row(this.scoreTable, `Sociabilité`, '', 9);
        create.row(this.scoreTable, `Survie`, '', 10);
        create.row(this.scoreTable, `Tir`, '', 11);
        create.row(this.scoreTable, `Volonté`, '', 12);
        this.module.appendChild(this.scoreTable);

        this.subScoreTable = document.createElement('table');
        this.subScoreTable.setAttribute('id', '');
        this.subScoreTable.classList.add('smallTable');
        create.row(this.subScoreTable, `Points de vie`, '', 0);
        create.row(this.subScoreTable, `Bonus de force`, '', 1);
        this.module.appendChild(this.subScoreTable);

        // BUTTON
        this.rollBtn = create.element('button', `${this.id}RollBtn`, 'Roll', this.module);
        this.rollBtn.classList.add('rollBtn');
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        })
    },
    roll() {
        this.content = new NPC;

        this.name.innerHTML = this.content.fullname
        this.mainArchetype.innerHTML = this.content.archetypes.value.main

        this.animalTitle.innerHTML = this.content.archetypes.value.animal.name
        this.animalText.innerHTML = this.content.archetypes.value.animal.traits
        this.animalImg.setAttribute('src', this.getArchetypeImg());

        this.infoTable.rows[0].cells[1].innerHTML = this.content.age.value.fr
        this.infoTable.rows[1].cells[1].innerHTML = this.content.gender.value.full
        this.infoTable.rows[2].cells[1].innerHTML = this.content.socialClass.value.fr
        this.infoTable.rows[3].cells[1].innerHTML = this.content.gold
        this.infoTable.rows[4].cells[1].innerHTML = this.content.attitude.value
        this.infoTable.rows[5].cells[1].innerHTML = this.content.appearance.value
        this.infoTable.rows[6].cells[1].innerHTML = this.content.motivations.value
        this.infoTable.rows[7].cells[1].innerHTML = this.content.focus.value
        this.infoTable.rows[8].cells[1].innerHTML = this.formatSpeciality(this.content.speciality.value)

        this.subtitle.innerHTML = this.content.stats.level.text;

        this.scoreTable.rows[0].cells[1].innerHTML = this.content.stats.COM.value
        this.scoreTable.rows[1].cells[1].innerHTML = this.content.stats.CNS.value
        this.scoreTable.rows[2].cells[1].innerHTML = this.content.stats.DIS.value
        this.scoreTable.rows[3].cells[1].innerHTML = this.content.stats.END.value
        this.scoreTable.rows[4].cells[1].innerHTML = this.content.stats.FOR.value
        this.scoreTable.rows[5].cells[1].innerHTML = this.content.stats.HAB.value
        this.scoreTable.rows[6].cells[1].innerHTML = this.content.stats.MAG.value
        this.scoreTable.rows[7].cells[1].innerHTML = this.content.stats.MVT.value
        this.scoreTable.rows[8].cells[1].innerHTML = this.content.stats.PER.value
        this.scoreTable.rows[9].cells[1].innerHTML = this.content.stats.SOC.value
        this.scoreTable.rows[10].cells[1].innerHTML = this.content.stats.SRV.value
        this.scoreTable.rows[11].cells[1].innerHTML = this.content.stats.TIR.value
        this.scoreTable.rows[12].cells[1].innerHTML = this.content.stats.VOL.value

        this.subScoreTable.rows[0].cells[1].innerHTML = this.content.stats.PV.value
        this.subScoreTable.rows[1].cells[1].innerHTML = this.content.stats.BF.value
    },
    formatSpeciality(speciality) {
        if (typeof speciality !== 'object') {
            return speciality
        } else {
            return `${speciality.name}<br><span>${speciality.desc}</span>`
        }
    },
    getArchetypeImg() {
        switch (this.content.archetypes.value.animal.name) {
            case 'Aigle': {
                return Aigle
            }
            case 'Âne': {
                return Âne
            }
            case 'Cerf': {
                return Cerf
            }
            case 'Chat': {
                return Chat
            }
            case 'Chien': {
                return Chien
            }
            case 'Coq': {
                return Coq
            }
            case 'Corbeau': {
                return Corbeau
            }
            case 'Fourmi': {
                return Fourmi
            }
            case 'Hibou': {
                return Hibou
            }
            case 'Hyène': {
                return Hyène
            }
            case 'Lapin': {
                return Lapin
            }
            case 'Lion': {
                return Lion
            }
            case 'Loup': {
                return Loup
            }
            case 'Mouton': {
                return Mouton
            }
            case 'Ours': {
                return Ours
            }
            case 'Paon': {
                return Paon
            }
            case 'Porc': {
                return Porc
            }
            case 'Rat': {
                return Rat
            }
            case 'Renard': {
                return Renard
            }
            case 'Serpent': {
                return Serpent
            }
            case 'Souris': {
                return Souris
            }
            case 'Taureau': {
                return Taureau
            }
            case 'Vautour': {
                return Vautour
            }
        }
    }
}

export { displayModuleNPC }