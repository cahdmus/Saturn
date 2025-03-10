import bestiaryData from './bestiaryData.json' with { type: 'json' };
import { roll, create } from "../utils.js";

const bestiary = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        // this.fill();
        this.bindEvents();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'bestiaryModule');
        this.webPage.appendChild(this.module);

        create.element('h1', '', 'Bestiary', this.module);
        this.content = create.element('div', 'bestiaryContent', '', this.module);
        
        // BUTTON
        this.rollBtn = create.element('button', `bestiarySelectBtn`, 'Select', this.module);
        this.rollBtn.classList.add('rollBtn');
    },
    generateRestOfDOM() {
        this.content.innerHTML = '';
        create.hr(this.content)
        this.title = create.element('h1', '', '', this.content);
        this.subtitle = create.element('h3', '', '', this.content);
    
        
        // STATS
        this.stats = create.element('h1', '', 'Caractéristiques', this.content);
        
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
        this.content.appendChild(this.scoreTable);
        
        this.subScoreTable = document.createElement('table');
        this.subScoreTable.setAttribute('id', '');
        this.subScoreTable.classList.add('smallTable');
        create.row(this.subScoreTable, `Points de vie`, '', 0);
        create.row(this.subScoreTable, `Bonus de force`, '', 1);
        this.content.appendChild(this.subScoreTable);
        
        this.desc = create.element('p', '', '', this.content);
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.selectCreature();
        })
    },
    fill(creature) {
        // this.creature = roll.from(bestiaryData)
        this.title.innerHTML =  creature.name
        this.subtitle.innerHTML = `${creature.type} - Taille ${creature.size}`
        
        this.scoreTable.rows[0].cells[1].innerHTML = creature.COM
        this.scoreTable.rows[1].cells[1].innerHTML = creature.CNS
        this.scoreTable.rows[2].cells[1].innerHTML = creature.DIS
        this.scoreTable.rows[3].cells[1].innerHTML = creature.END
        this.scoreTable.rows[4].cells[1].innerHTML = creature.FOR
        this.scoreTable.rows[5].cells[1].innerHTML = creature.HAB
        this.scoreTable.rows[6].cells[1].innerHTML = creature.MAG
        this.scoreTable.rows[7].cells[1].innerHTML = creature.MVT
        this.scoreTable.rows[8].cells[1].innerHTML = creature.PER
        this.scoreTable.rows[9].cells[1].innerHTML = creature.SOC
        this.scoreTable.rows[10].cells[1].innerHTML = creature.SRV
        this.scoreTable.rows[11].cells[1].innerHTML = creature.TIR
        this.scoreTable.rows[12].cells[1].innerHTML = creature.VOL
        
        this.subScoreTable.rows[0].cells[1].innerHTML = creature.PV
        this.subScoreTable.rows[1].cells[1].innerHTML = creature.BF
        
        this.desc.innerHTML = creature.actions
    },
    selectCreature() {
        this.myNav = create.element('div', 'myNav', '', this.webPage);
        this.myNav.classList.add('overlay');
        this.overlayContent = create.element('div', 'overlayContent', '', this.myNav);
        this.overlayContent.classList.add('overlay-content');
        
        bestiaryData.forEach((creature) => {
            const creatureBtn = create.element('a', '', creature.name, this.overlayContent);
            creatureBtn.classList.add('creatureBtn');

            creatureBtn.addEventListener('click', () => {
                this.generateRestOfDOM()
                this.fill(creature)
                this.myNav.remove()
            })
        })
    }
}

export { bestiary }