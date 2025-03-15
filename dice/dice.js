import { roll, create } from "../utils.js";

const displayDice = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.content = document.querySelector('#homeContent')
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.classList.add('card');
        
        // INPUT
        this.title = create.element('h2', '', 'Lancer un d', this.module);
        this.dice = create.element('input', 'dice', '', this.title);
        this.dice.setAttribute('type', 'text')
        this.dice.value = '100'
        
        // RESULT and BUTTON
        this.result = create.element('div', 'result', '00', this.module);
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);
        this.rollBtn.classList.add('rollBtn');

        this.content.appendChild(this.module);
    },
    bindEvents() {
        this.rollBtn.addEventListener('click', () => {
            const value = this.dice.value;
            this.result.innerHTML = roll.dCustom(value);
        });
    }
}

export { displayDice }