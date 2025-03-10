import bestiaryData from './bestiaryData.json' with { type: 'json' };
import { roll, create } from "../utils.js";

const randomBestiary = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.roll();
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
        this.title = create.element('h1', '', '', this.module);
        this.subtitle = create.element('h3', '', '', this.module);

        
        // STATS
        this.stats = create.element('h1', '', 'Caractéristiques', this.module);
        
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
        
        this.desc = create.element('p', '', '', this.module);

        // BUTTON
        this.rollBtn = create.element('button', `bestiaryRollBtn`, 'Roll', this.module);
        this.rollBtn.classList.add('rollBtn');
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        })
    },
    roll() {
        this.creature = roll.from(bestiaryData)
        this.title.innerHTML =  this.creature.name
        this.subtitle.innerHTML = `${this.creature.type} - Taille ${this.creature.size}`
        
        this.scoreTable.rows[0].cells[1].innerHTML = this.creature.COM
        this.scoreTable.rows[1].cells[1].innerHTML = this.creature.CNS
        this.scoreTable.rows[2].cells[1].innerHTML = this.creature.DIS
        this.scoreTable.rows[3].cells[1].innerHTML = this.creature.END
        this.scoreTable.rows[4].cells[1].innerHTML = this.creature.FOR
        this.scoreTable.rows[5].cells[1].innerHTML = this.creature.HAB
        this.scoreTable.rows[6].cells[1].innerHTML = this.creature.MAG
        this.scoreTable.rows[7].cells[1].innerHTML = this.creature.MVT
        this.scoreTable.rows[8].cells[1].innerHTML = this.creature.PER
        this.scoreTable.rows[9].cells[1].innerHTML = this.creature.SOC
        this.scoreTable.rows[10].cells[1].innerHTML = this.creature.SRV
        this.scoreTable.rows[11].cells[1].innerHTML = this.creature.TIR
        this.scoreTable.rows[12].cells[1].innerHTML = this.creature.VOL
        
        this.subScoreTable.rows[0].cells[1].innerHTML = this.creature.PV
        this.subScoreTable.rows[1].cells[1].innerHTML = this.creature.BF
        
        this.desc.innerHTML = this.creature.actions
    },
}

export { randomBestiary }