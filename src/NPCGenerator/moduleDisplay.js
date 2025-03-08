import { Monster } from "./monsterGenerator";
import { create } from "../utils";

const displayModule = {
    init(title, id) {
        this.title = title;
        this.id = id;
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
        this.module.setAttribute('id', this.id);
        this.webPage.appendChild(this.module);
        this.title = create.element('h1', '', this.title, this.module);

        this.infoTable = document.createElement('table');
        create.row(this.infoTable, `Type`, '', 0);
        create.row(this.infoTable, `Description`, '', 1);
        create.row(this.infoTable, `Taile`, '', 2);
        create.row(this.infoTable, `Quantité`, '', 3);
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
        this.content = new Monster;
        this.infoTable.rows[0].cells[1].innerHTML = this.content.type.value.name;
        this.infoTable.rows[1].cells[1].innerHTML = this.content.type.value.desc;
        this.infoTable.rows[2].cells[1].innerHTML = this.content.size.value.fr;
        this.infoTable.rows[3].cells[1].innerHTML = this.content.quantity.value;

        this.subtitle.innerHTML = `${this.content.stats.subtype} - ${this.content.stats.level.text}`;

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
    }
}

export { displayModule }