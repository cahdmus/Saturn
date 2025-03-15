import { create } from "../utils.js";
import { yesOrNo } from "../yes or no/yesOrNo.js";
import { displayDice } from "../dice/dice.js";


const home = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
        yesOrNo.init();
        displayDice.init();
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    generateDOM() {
        create.element('h1', '', 'Saturn', this.main);
        create.element('h3', '', 'Solo Adventure Tools for Unearthing Random Narratives', this.main);
        create.hr(this.main);

        this.content = create.element('div', 'homeContent', '', this.main);
        const desc = `Bienvenue sur <b>SATURN</b>, un ensemble d'outils pour jouer au TTRPG en solo. C'est un concept un peu long à expliquer, donc je le ferais pas, mais si vous trouvez une utilité à ce site j'en serais absolument ravie !<br>C'est un site un peu chaotique que j'améliorerais au fur et à mesure et donc qui ne sera probablement jamais terminé.<br>Quoi qu'il en soit, amusez-vous bien sur <b>SATURN</b> !</br><button class="rollBtn"><a href="https://github.com/cahdmus">Mon github</a></button>`
        create.element('p', '', desc, this.content);
    },
    bindEvents() {
        this.cacheDOM();
    }
}

export { home }