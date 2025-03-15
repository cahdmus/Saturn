import { create } from "../utils.js";
import { NPC } from "../NPCGenerator/NPCGenerator.js";

const npcs = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.roll();
        this.bindEvents();
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    generateDOM() {
        create.element('h1', '', 'Générateur de Personnages', this.main)
        create.hr(this.main)
        this.content = create.element('div', 'npcPage', '', this.main)
        this.content.classList.add('moduleContent')

        // COLUMN ONE
        this.col1 = create.element('div', 'col1', '', this.content)
        this.col1.classList.add('card')
        this.avatarContainer = create.element('div', 'avatarContainer', '', this.col1);
        this.avatarImg = create.element('img', '', '', this.avatarContainer);
        // PROFILE
        this.profile = create.element('div', 'profile', '', this.col1)
        // NAME
        this.name = create.element('h2', '', '', this.profile)
        // MAIN ARCHETYPE
        this.mainArchetype = create.element('h3', '', '', this.profile)
        create.hr(this.profile)
        // INFOS
        this.infos = create.element('h4', '', '', this.profile)

        // COLUMN TWO
        this.col2 = create.element('div', 'col2', '', this.content)
        // STATS
        this.stats = create.element('h3', '', 'Caractéristiques', this.col2);
        this.subtitle = create.element('h4', '', '', this.col2);

        this.scoreTable = create.element('table', 'scoreTable', '', this.col2);
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

        this.subScoreTable = create.element('table', 'subScoreTable', '', this.col2);
        this.subScoreTable.classList.add('smallTable');
        create.row(this.subScoreTable, `Points de vie`, '', 0);
        create.row(this.subScoreTable, `Bonus de force`, '', 1);

        // BUTTON
        this.rollBtn = create.element('button', 'NPCRollBtn', 'Relancer', this.col2);
        this.rollBtn.classList.add('rollBtn');

        // COLUMN THREE
        this.col3 = create.element('div', 'col3', '', this.content)

        // ANIMAL ARCHETYPE
        this.animalArchetype = create.element('div', '', '', this.col3)
        this.animalArchetype.classList.add('animalArchetype');
        // -- animal name
        this.animalTitle = create.element('p', '', '', this.animalArchetype)
        this.animalTitle.classList.add('title');
        this.animalDesc = create.element('p', '', '', this.animalArchetype)
        this.animalDesc.classList.add('animalDesc');
        // -- animal image
        this.animalImg = create.element('img', '', '', this.animalDesc)
        // -- animal text
        this.animalTextContainer = create.element('div', '', '', this.animalDesc)
        this.animalTextContainer.classList.add('animalTextContainer');
        this.animalText = create.element('p', '', '', this.animalTextContainer)
        this.animalText.classList.add('desc');

        // INFO
        this.infoTable = create.element('table', 'scoreTable', '', this.col3);
        create.row(this.infoTable, `Pièces d'argent`, '', 0);
        create.row(this.infoTable, `Attitude`, '', 1);
        create.row(this.infoTable, `Mannière`, '', 2);
        create.row(this.infoTable, `Apparence`, '', 3);
        create.row(this.infoTable, `Motivations`, '', 4);
        create.row(this.infoTable, `Focus`, '', 5);
        create.row(this.infoTable, `Spécialité`, '', 6);
    },
    roll() {
        this.NPC = new NPC;

        // COLUMN ONE
        this.avatarImg.setAttribute('src', `NPCGenerator/images/Avatar/${this.NPC.avatar}`);
        this.name.innerHTML = this.NPC.fullname;
        this.mainArchetype.innerHTML = this.NPC.archetypes.value.main;
        this.infos.innerHTML = `${this.NPC.age.value.fr} - ${this.NPC.gender.value.full} - ${this.NPC.socialClass.value.fr}`

        // COLUMN TWO
        this.subtitle.innerHTML = this.NPC.stats.level.text;

        this.scoreTable.rows[0].cells[1].innerHTML = this.NPC.stats.COM.value
        this.scoreTable.rows[1].cells[1].innerHTML = this.NPC.stats.CNS.value
        this.scoreTable.rows[2].cells[1].innerHTML = this.NPC.stats.DIS.value
        this.scoreTable.rows[3].cells[1].innerHTML = this.NPC.stats.END.value
        this.scoreTable.rows[4].cells[1].innerHTML = this.NPC.stats.FOR.value
        this.scoreTable.rows[5].cells[1].innerHTML = this.NPC.stats.HAB.value
        this.scoreTable.rows[6].cells[1].innerHTML = this.NPC.stats.MAG.value
        this.scoreTable.rows[7].cells[1].innerHTML = this.NPC.stats.MVT.value
        this.scoreTable.rows[8].cells[1].innerHTML = this.NPC.stats.PER.value
        this.scoreTable.rows[9].cells[1].innerHTML = this.NPC.stats.SOC.value
        this.scoreTable.rows[10].cells[1].innerHTML = this.NPC.stats.SRV.value
        this.scoreTable.rows[11].cells[1].innerHTML = this.NPC.stats.TIR.value
        this.scoreTable.rows[12].cells[1].innerHTML = this.NPC.stats.VOL.value

        this.subScoreTable.rows[0].cells[1].innerHTML = this.NPC.stats.PV.value
        this.subScoreTable.rows[1].cells[1].innerHTML = this.NPC.stats.BF.value

        // COLUMN THREE
        this.animalTitle.innerHTML = this.NPC.archetypes.value.animal.name
        this.animalText.innerHTML = this.NPC.archetypes.value.animal.traits
        this.animalImg.setAttribute('src', `NPCGenerator/images/Animal/${this.NPC.archetypes.value.animal.url}`);

        this.infoTable.rows[0].cells[1].innerHTML = this.NPC.gold
        this.infoTable.rows[1].cells[1].innerHTML = this.NPC.habit.value
        this.infoTable.rows[2].cells[1].innerHTML = this.NPC.attitude.value
        this.infoTable.rows[3].cells[1].innerHTML = this.NPC.appearance.value
        this.infoTable.rows[4].cells[1].innerHTML = this.NPC.motivations.value
        this.infoTable.rows[5].cells[1].innerHTML = this.NPC.focus.value
        this.infoTable.rows[6].cells[1].innerHTML = this.formatSpeciality(this.NPC.speciality.value)
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        })
    },
    formatSpeciality(speciality) {
        if (typeof speciality !== 'object') {
            return speciality
        } else {
            return `${speciality.name}<br><span>${speciality.desc}</span>`
        }
    }
}

export { npcs }