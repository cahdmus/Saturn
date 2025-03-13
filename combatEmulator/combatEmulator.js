import { roll, create } from "../utils.js";

const combatEmulator = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'combatEmulator');
        this.title = create.element('h1', '', 'Emulateur de combat', this.module);

        create.hr(this.module)
        // AGGRO
        this.aggroTitle = create.element('h3', '', `Score d'agression (1-6)`, this.module);
        this.aggro = create.element('input', 'chaos', '', this.aggroTitle);
        this.aggro.setAttribute('type', 'text')
        this.aggro.value = '4'
        
        create.hr(this.module)
        
        // RESULT and BUTTON
        this.resultTitle = create.element('h3', '', '', this.module);
        this.result = create.element('p', '', '...', this.module);
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);

        this.webPage.appendChild(this.module);
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        });
    },
    roll() {
        this.tactic = this.rollTactic()
        this.resultTitle.innerHTML = `Tactic die : ${this.tacticDie}. Total score of modifier dice : ${this.die1 + this.die2}`
        this.result.innerHTML = `<span>${this.tactic.name}</span> - ${this.tactic.desc}`
    },
    rollTactic() {
        this.tacticDie = roll.d6()
        this.die1 = roll.d6()
        this.die2 = roll.d6()

        if (this.tactic === undefined) {
            return this.getTactic(this.die1 + this.die2 + parseInt(this.aggro.value));
        } else if (this.tacticDie <= 3) {
            return this.tactic;
        } else if (this.tacticDie >= 4 && this.tacticDie <= 5) {
            return this.getTactic(this.die1 + this.die2 + parseInt(this.aggro.value))
        } else if (this.tacticDie === 6) {
            return  this.getTwistTactic();
        }
    },
    getTactic(score) {
        switch (score) {
            case 3:
                return { name: 'Panique', desc: `Fuit sans faire attention, s'exposant à des attaques d'opportunités` }
            case 4:
                return { name: 'Se rend', desc: `Jete les armes et se soumet à l'adversaire.` }
            case 5:
                return { name: 'Se désengage', desc: `Tente d'attirer l'attention de l'adversaire ailleurs que sur lui.` }
            case 6:
                return { name: 'Retraite', desc: `Se met à couvert ou hors de portée.` }
            case 7:
                return { name: 'Sur ses gardes', desc: `Se défend uniquement, pas d'attaque.` }
            case 8:
                return { name: 'Sonde', desc: `Attaque prudemment pour tester les défenses adverses.` }
            case 9:
                return { name: `Use l'adversaire`, desc: `Fait durer le combat et tente de fatiguer l'adversaire.` }
            case 10:
                return { name: 'Face à face', desc: `Attend que l'adversaire effectue le prochain mouvement.` }
            case 11:
                return { name: 'Équilibre', desc: `Attaque et défend de manière équilibrée, sans stratégie particulière.` }
            case 12:
                return { name: 'Feinte', desc: `Essaye de piéger l'adversaire pour qu'il se défende contre un mauvais mouvement.` }
            case 13:
                return { name: 'Créer la confusion', desc: `Passe rapidement d'un combat agressif à un combat défensif pour déséquilibrer l'adversaire.` }
            case 14:
                return { name: 'Provoque', desc: `Tente de mettre l'adversaire en colère ou de le choquer pour qu'il commette une erreur.` }
            case 15:
                return { name: 'Coup de pression', desc: `Garde l'adversaire sur la défensive en espérant que ses compétences soient inférieures.` }
            case 16:
                return { name: 'Frappe', desc: `Tente de pénétrer la défense adverse avec une attaque rapide.` }
            case 17:
                return { name: 'Charge', desc: `Attaque avec férocité, au risque de se blesser pour toucher l'adversaire.` }
            case 18:
                return { name: 'Frénésie', desc: `Attaque sauvagement, au risque de se tuer pour toucher l'adversaire.` }
        }
    },
    getTwistTactic() {
        const twists = [
            { name: 'Renforts', desc: `Appel à l'aide des alliés ou des passants` },
            { name: 'Change', desc: `Change d'arme, d'objectif ou de position.` },
            { name: 'Désavantager', desc: `Utilise l'environnement pour désavantager l'adversaire (pousser un chandelier allumé sur lui, couper un rideau pour qu'il tombe sur sa tête, etc).` },
            { name: `S'avantager`, desc: `Prend de la hauteur, se déplace pour ne pas être face au soleil, dégaine ou attrape une deuxième arme, etc.` },
            { name: 'Fait un marché', desc: `Essaye de persuader l'adversaire de se rendre, d'abandonner le combat ou de changer de camp.` },
            { name: 'Ruse', desc: `Essaye de convaincre l'adversaire qu'il est sur le point de subir un revers ou d'obtenir un faux avantage.` }
        ]

        return roll.from(twists)
    }
}

export { combatEmulator }