import { roll, create } from "../utils.js";

const proficiency = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.content = document.querySelector('#rulesPage');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'proficiency');
        this.title = create.element('h2', '', 'Apprendre une spécialisation', this.module);
        create.hr(this.module)
        create.element('h4', '', `Prix normal d'un entraînement - 2 pièces d'or par jour`, this.module);
        const explication = `Une fois que l'on a trouvé un maître et acheté le matériel nécessaire, on détermine le dé de départ. Une fois par jour, le joueur devra lancé ce dé jusqu'à ce qu'il obtienne une réussite. Il passe alors au dé supérieur jusqu'à ce qu'il arrive au dernier dé, avec lequel il doit obtenir un certain nombre de réussite pour devenir spécialiste.`
        create.element('p', '', explication, this.module);
        create.element('h4', '', `Ordre des dés : D20 - D12 - D10 - D8 - D6 - D4`, this.module);

        create.hr(this.module)
        this.moduleContent2 = create.element('div', 'moduleContent2', '', this.module);

        // COLUMN ONE
        this.col1 = create.element('div', '', '', this.moduleContent2);
        this.col1.classList.add('card')

        // SCORE
        this.scoreTitle = create.element('h3', '', 'Score du personnage de la capacité associée', this.col1);
        this.score = create.element('input', 'Score', '', this.scoreTitle);
        this.score.setAttribute('type', 'text')
        this.score.value = '50'
        this.scoreResult = create.element('div', 'result', '...', this.col1);

        // COLUMN TWO
        this.col2 = create.element('div', '', '', this.moduleContent2);
        this.col2.classList.add('card')

        // HOURS
        this.hoursTitle = create.element('h3', '', `Heures à s'entraîner ce jour (min 4)`, this.col2);
        this.hours = create.element('input', 'Hours', '', this.hoursTitle);
        this.hours.setAttribute('type', 'text')
        this.hours.value = '4'
        this.hoursResult = create.element('div', 'result', '...', this.col2);

        // HOURS
        this.numOfSuccessTitle = create.element('h3', '', `Nombre de succès requis une fois arrivé aux D4`, this.module);
        this.numOfSuccessResult = create.element('div', 'result', '...', this.module);

        // RESULT and BUTTON
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);
        this.rollBtn.classList.add('rollBtn')

        create.hr(this.module)
        create.element('h3', '', `Notes sur le Dressage`, this.module);
        const dressageExplication = `Pour dresser un animal il faut réussir à le capturer en réussisant un test (FOR + SRV)/2. Les trois jours suivants, le joueur doit passer au moins deux heures avec l'animal et réussir un jet de survie par jour. On suit ensuite les règles habituelles ci-dessus.`;
        create.element('p', '', dressageExplication, this.module);

        this.content.appendChild(this.module);
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        });
    },
    roll() {
        this.scoreResult.innerHTML = this.getDice();
        this.hoursResult.innerHTML = this.getDC();
        this.numOfSuccessResult.innerHTML = this.getNumOfSuccess();
    },
    getDice() {
        const playerScore = this.score.value
        let dice;

        if (playerScore < 25) {
            dice = 'd20'
        } else if (playerScore >= 25 && playerScore < 35) {
            dice = 'd12'
        } else if (playerScore >= 35 && playerScore < 45) {
            dice = 'd10'
        } else if (playerScore >= 45 && playerScore < 55) {
            dice = 'd8'
        } else if (playerScore >= 55 && playerScore < 65) {
            dice = 'd6'
        } else if (playerScore >= 65) {
            dice = 'd4'
        }

        return `Le dé de départ est un ${dice}`
    },
    getDC() {
        const hours = this.hours.value
        let success;

        if (hours < 4) {
            success = 0
        } else if (hours >= 4 && hours < 8) {
            success = 1
        } else if (hours >= 8 && hours < 12) {
            success = '1 ou 2'
        } else if (hours >= 12 && hours < 16) {
            success = '1, 2 ou 3'
        } else if (hours >= 16) {
            success = 1
        }

        return `Il faut obtenir un ${success} au dé pour obtenir un succès`
    },
    getNumOfSuccess() {
        const playerScore = this.score.value
        let success = 0;

        if (playerScore < 35) {
            success = 1
        } else if (playerScore >= 35 && playerScore < 45) {
            success = 2
        } else if (playerScore >= 45 && playerScore < 55) {
            success = 3
        } else if (playerScore >= 55 && playerScore < 65) {
            success = 4
        } else if (playerScore >= 65) {
            success = 5
        }

        return `Il faut ${success} succès au D4 pour devenir spécialiste`
    }
}

export { proficiency }