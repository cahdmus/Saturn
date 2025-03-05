import yesOrNoData from './yesOrNoData.json' assert { type: 'json' };
import { roll, create } from "/src/utils.js";

const yesOrNo = {
    odd: 'Equal',
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content');
        this.oddsBtns = document.querySelectorAll('#yesOrNo #odds button');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'yesOrNo');
        this.title = create.element('h1', '', 'Yes or No ?', this.module);

        // CHAOS
        this.chaosTitle = create.element('h3', '', 'Chaos', this.module);
        this.chaos = create.element('input', 'chaos', '', this.chaosTitle);
        this.chaos.setAttribute('type', 'text')
        this.chaos.value = '5'

        // ODDS
        this.oddsTitle = create.element('h3', '', 'Odds', this.module);
        this.odds = create.element('div', 'odds', '', this.module);
        const oddsValues = ['Impossible', 'Implausible', 'Unlikely', 'Equal', 'Maybe', 'Possible', 'Certain']
        oddsValues.forEach((value) => {
            const el = create.element('button', value, value, this.odds);
            el.classList.add('pseudoRadio');
            (value === 'Equal') ? el.classList.add('checked') : el;
        })        

        // RESULT and BUTTON
        this.result = create.element('div', 'result', '...', this.module);
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);

        this.webPage.appendChild(this.module);
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            const value = this.roll();
            this.result.innerHTML = value;
        });

        this.oddsBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                this.oddsBtns.forEach((btn) => {
                    btn.classList.remove('checked')
                })
                btn.classList.add('checked')
                this.odd = btn.id;
            });
        })
    },
    roll() {
        const chaos = this.chaos.value - 1;
        const data = Object.values(yesOrNoData)[chaos];
        const range = data[this.odd];

        const chance = roll.d100();

        // console.log(`Because the odds are ${this.odd}, chaos is ${this.chaos.value}, and I rolled a ${chance}, which is between ${range.No1.min} and ${range.No1.max} I got...`)
        
        if (chance >= range.Yes1.min && chance <= range.Yes1.max) {
            return 'Yes, and...';
        } else if (chance >= range.Yes2.min && chance <= range.Yes2.max) {
            return 'Yes';
        } else if (chance >= range.Yes3.min && chance <= range.Yes3.max) {
            return 'Yes, but...';
        } else if (chance >= range.No3.min && chance <= range.No3.max) {
            return 'No, but...';
        } else if (chance >= range.No2.min && chance <= range.No2.max) {
            return 'No';
        } else if (chance >= range.No1.min && chance <= range.No1.max) {
            return 'No, and...';
        }
    }
}

export { yesOrNo }