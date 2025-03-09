import { roll, create } from "/src/utils.js";
import letterData from './letterGeneratorData.json' assert { type: 'json' };
import miscellaneous from '/src/miscellaneous/miscellaneousData.json' assert { type: 'json' };

const letterGenerator = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.roll(),
        this.bindEvents();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'opposition');
        this.title = create.element('h1', '', 'Générateurs de document', this.module);
        
        this.infoTable = document.createElement('table');
        create.row(this.infoTable, `Contenu`, '', 0);
        create.row(this.infoTable, `Emotion`, '', 1);
        create.row(this.infoTable, `Auteur`, '', 2);
        create.row(this.infoTable, `Destinataire`, '', 3);
        create.row(this.infoTable, `Attitude de l'auteur`, '', 4);
        create.row(this.infoTable, `Etat`, '', 5);
        create.row(this.infoTable, `Couleur de l'encre`, '', 6);
        this.module.appendChild(this.infoTable);

        // BUTTON
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);

        this.webPage.appendChild(this.module);
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        })
    },
    roll() {
        this.infoTable.rows[0].cells[1].innerHTML = this.getContent();
        this.infoTable.rows[1].cells[1].innerHTML = this.getEmotion();
        this.infoTable.rows[2].cells[1].innerHTML = this.getPerson();
        this.infoTable.rows[3].cells[1].innerHTML = this.getPerson();
        this.infoTable.rows[4].cells[1].innerHTML = this.getAttitude();
        this.infoTable.rows[5].cells[1].innerHTML = this.getState();
        this.infoTable.rows[6].cells[1].innerHTML = this.getColor();
    },
    getColor() {
        return roll.from(miscellaneous.color)
    },
    getEmotion() {
        return roll.from(miscellaneous.emotion)
    },
    getAttitude() {
        return roll.from(miscellaneous.attitude)
    },
    getContent() {
        return roll.from(letterData.content)
    },
    getPerson() {
        return roll.from(letterData.author)
    },
    getState() {
        return roll.from(letterData.state)
    }
}

export { letterGenerator }