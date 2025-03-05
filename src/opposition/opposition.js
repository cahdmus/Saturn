import { roll, create } from "/src/utils.js";

const opposition = {
    odd: 'neutral',
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content');
        this.oddsBtns = document.querySelectorAll('#opposition #odds button');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'opposition');
        this.title = create.element('h1', '', 'Simple opposition', this.module);
        this.stats = create.element('div', 'stats', '', this.module);

        // INPUT
        this.player = create.element('h3', '', 'Player score ', this.stats);
        this.playerStat = create.element('input', 'opponent', '', this.player);
        this.playerStat.setAttribute('type', 'text')
        this.playerStat.value = '50'

        this.opponent = create.element('h3', '', 'Opponent score ', this.stats);
        this.opponentStat = create.element('input', 'opponent', '', this.opponent);
        this.opponentStat.setAttribute('type', 'text')
        this.opponentStat.value = '00'

        // ODDS
        this.oddsTitle = create.element('h3', '', 'Odds', this.module);
        this.odds = create.element('div', 'odds', '', this.module);
        const oddsValues = ['Incredibly simple', 'Very easy', 'Easy', 'Neutral', 'Tricky', 'Hard', 'Very hard', 'Almost impossible']
        oddsValues.forEach((value) => {
            const el = create.element('button', value, value, this.odds);
            el.classList.add('pseudoRadio');
            (value === 'Neutral') ? el.classList.add('checked') : el;
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
    getLimit() {
        const playerScore = parseInt(this.playerStat.value);
        const opponentBonus = (this.opponentStat.value != 0) ? 50 - parseInt(this.opponentStat.value) : 0;
        let bonus;
        switch (this.odd) {
            case 'Incredibly simple':
                bonus = 30;
                break;
            case 'Very easy':
                bonus = 20;
                break;
            case 'Easy':
                bonus = 10;
                break;
            case 'Neutral':
                bonus = 0;
                break;
            case 'Tricky':
                bonus = -5;
                break;
            case 'Hard':
                bonus = -10;
                break;
            case 'Very hard':
                bonus = -20;
                break;
            case 'Almost impossible':
                bonus = -30;
                break;
            default: 
                bonus = 0;
        }
    
        return playerScore + opponentBonus + bonus;
    },
    roll() {
        const limit = this.getLimit();
        const chance = roll.d100();

        let gap = limit - chance;
        let text = this.getText(gap, chance, limit)

        return `<span>Limit ${limit} - Score ${chance}</span><br>${text}`
    },
    getText(gap, chance, limit) {
        if (gap == 0) {
            return 'Success by a hair !'
        } else if (chance != 0 && chance < limit && chance%10 == 0) {
            return 'Critical success !'
        } else if (chance > limit && chance%10 == 0) {
            return 'Critical failure !'
        } else if (gap > 0 && gap <= 10) {
            return 'Disappointing success'
        } else if (gap > 10 && gap <= 20) {
            return 'Delightful success'
        } else if (gap > 20 && gap <= 30) {
            return 'Brilliant success'
        } else if (gap > 30 && gap <= 40) {
            return 'Fantastic success'
        } else if (gap > 40) {
            return 'Massive success'
        } else if (gap == -1) {
            return 'Frustrating failure'
        } else if (gap > -10 && gap <= -1) {
            return 'Failure...'
        } else if (gap > -20 && gap <= -10) {
            return 'Vexing failure'
        } else if (gap > -30 && gap <= -20) {
            return 'Obvious failure'
        } else if (gap > -40 && gap <= -30) {
            return 'Resounding failure'
        } else if (gap <= -40) {
            return 'Roaring failure'
        }
    }
}

export { opposition }