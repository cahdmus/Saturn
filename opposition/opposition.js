import { roll, create } from "/utils.js";

const opposition = {
    odd: 'Neutre',
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
        create.hr(this.module)
        this.stats = create.element('div', 'stats', '', this.module);
        
        // INPUT
        this.player = create.element('h3', '', 'Score joueur ', this.stats);
        this.playerStat = create.element('input', 'opponent', '', this.player);
        this.playerStat.setAttribute('type', 'text')
        this.playerStat.value = '50'

        this.opponent = create.element('h3', '', 'Score adversaire', this.stats);
        this.opponentStat = create.element('input', 'opponent', '', this.opponent);
        this.opponentStat.setAttribute('type', 'text')
        this.opponentStat.value = '00'

        create.hr(this.module)
        // ODDS
        this.oddsTitle = create.element('h3', '', 'Chances', this.module);
        this.odds = create.element('div', 'odds', '', this.module);
        const oddsValues = ['Incroyablement simple', 'Très facile', 'Facile', 'Neutre', 'Complexe', 'Difficile', 'Très difficile', 'Presque impossible']
        oddsValues.forEach((value) => {
            const el = create.element('button', value, value, this.odds);
            el.classList.add('pseudoRadio');
            (value === 'Neutre') ? el.classList.add('checked') : el;
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
            case 'Incroyablement simple':
                bonus = 30;
                break;
            case 'Très facile':
                bonus = 20;
                break;
            case 'Facile':
                bonus = 10;
                break;
            case 'Neutre':
                bonus = 0;
                break;
            case 'Complexe':
                bonus = -5;
                break;
            case 'Difficile':
                bonus = -10;
                break;
            case 'Très difficile':
                bonus = -20;
                break;
            case 'Presque impossible':
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
            return 'Réussite de justesse !'
        } else if (chance != 0 && chance < limit && chance%10 == 0) {
            return 'Réussite critique !'
        } else if (chance > limit && chance%10 == 0) {
            return 'Échec critique !'
        } else if (gap > 0 && gap <= 10) {
            return 'Réussite décevante'
        } else if (gap > 10 && gap <= 20) {
            return 'Réussite satisfaisante'
        } else if (gap > 20 && gap <= 30) {
            return 'Réussite brillante'
        } else if (gap > 30 && gap <= 40) {
            return 'Réussite épatante'
        } else if (gap > 40) {
            return 'Réussite éblouissante !'
        } else if (gap == -1) {
            return 'Échec rageant !'
        } else if (gap > -10 && gap <= -1) {
            return 'Échec ...'
        } else if (gap > -20 && gap <= -10) {
            return 'Échec vexant'
        } else if (gap > -30 && gap <= -20) {
            return 'Échec flagrant'
        } else if (gap > -40 && gap <= -30) {
            return 'Échec cuisant'
        } else if (gap <= -40) {
            return 'Échec retantissant'
        }
    }
}

export { opposition }