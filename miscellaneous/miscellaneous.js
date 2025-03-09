import { roll, create } from "/src/utils.js";
import miscellaneous from './miscellaneousData.json' assert { type: 'json' };

const miscellaneousGenerator = {
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
        this.title = create.element('h1', '', 'Générateurs divers', this.module);
        
        this.infoTable = document.createElement('table');
        create.row(this.infoTable, `Couleur`, '', 0);
        create.row(this.infoTable, `Ancienneté`, '', 1);
        create.row(this.infoTable, `Elément`, '', 2);
        create.row(this.infoTable, `Capacité`, '', 3);
        create.row(this.infoTable, `Emotion`, '', 4);
        create.row(this.infoTable, `Attitude`, '', 5);
        create.row(this.infoTable, `Ouïe`, '', 6);
        create.row(this.infoTable, `Vue`, '', 7);
        create.row(this.infoTable, `Touché`, '', 8);
        create.row(this.infoTable, `Odorat`, '', 9);
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
        this.infoTable.rows[0].cells[1].innerHTML = this.getColor();
        this.infoTable.rows[1].cells[1].innerHTML = this.getTimeSpan();
        this.infoTable.rows[2].cells[1].innerHTML = this.getElement();
        this.infoTable.rows[3].cells[1].innerHTML = this.getCapacity();
        this.infoTable.rows[4].cells[1].innerHTML = this.getEmotion();
        this.infoTable.rows[5].cells[1].innerHTML = this.getAttitude();
        this.infoTable.rows[6].cells[1].innerHTML = this.getHearing();
        this.infoTable.rows[7].cells[1].innerHTML = this.getSight();
        this.infoTable.rows[8].cells[1].innerHTML = this.getTouch();
        this.infoTable.rows[9].cells[1].innerHTML = this.getSmell();
    },
    getColor() {
        return roll.from(miscellaneous.color)
    },
    getTimeSpan() {
        return roll.from(miscellaneous.timeSpan)
    },
    getElement() {
        const element = Object.keys(miscellaneous.element);
        return roll.from(element)
    },
    getCapacity() {
        const capacity = Object.keys(miscellaneous.capacity);
        return roll.from(capacity)
    },
    getEmotion() {
        return roll.from(miscellaneous.emotion)
    },
    getAttitude() {
        return roll.from(miscellaneous.attitude)
    },
    getHearing() {
        return roll.from(miscellaneous.sens.hearing)
    },
    getSight() {
        return roll.from(miscellaneous.sens.sight)
    },
    getTouch() {
        return roll.from(miscellaneous.sens.touch)
    },
    getSmell() {
        return roll.from(miscellaneous.sens.smell)
    }
}

export { miscellaneousGenerator }