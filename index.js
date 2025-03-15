import { opposition } from "./opposition/opposition.js";
import { sceneGenerator } from "./scene/scene.js"
import { explorationGenerator } from "./exploration/exploration.js";
import { miscellaneousGenerator } from "./miscellaneous/miscellaneous.js";
import { letterGenerator } from "./letterGenerator/letterGenerator.js";
import { displayModule } from "./NPCGenerator/moduleDisplay.js";
import { randomBestiary } from "./bestiary/randomBestiary.js";
import { quest } from "./quest/quest.js";
import { proficiency } from "./proficiency/proficiency.js";
import { combatEmulator } from "./combatEmulator/combatEmulator.js";

// displayModuleNPC.init('', 'NPCGenerator');
// opposition.init();
// yesOrNo.init();
// displayDice.init();
// letterGenerator.init();
// sceneGenerator.init();
// explorationGenerator.init();
// miscellaneousGenerator.init();
// displayModule.init('Machine à Monstres', 'monsterGenerator');
// randomBestiary.init();
// bestiary.init();
// quest.init();
// proficiency.init()
// combatEmulator.init()

import { create } from "./utils.js";
import { home } from "./pages/home.js";
import { npcs } from "./pages/npcs.js";
import { explo } from "./pages/explo.js";
import { combat } from "./pages/combat.js";
import { rules } from "./pages/rules.js";
import { bestiary } from "./pages/bestiary.js";

const saturn = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
        home.init()
    },
    cacheDOM() {
        this.header = document.querySelector('header');
        this.main = document.querySelector('main');
        this.menuBtns = document.querySelectorAll('header button');
    },
    generateDOM() {
        // MENU
        this.home = create.element('button', 'home', 'Accueil', this.header);
        this.home.classList.add('selected')
        this.npcs = create.element('button', 'npcs', 'Personnages', this.header);
        this.explo = create.element('button', 'explo', 'Exploration', this.header);
        this.combat = create.element('button', 'combat', 'Combat', this.header);
        this.rules = create.element('button', 'rules', 'Règles', this.header);
        this.rules = create.element('button', 'bestiary', 'Bestiaire', this.header);
    },
    bindEvents() {
        this.cacheDOM();

        this.menuBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.changeBtnsClass(btn);
                this.displayPage(btn.id);
            });
        });
    },
    changeBtnsClass(btn) {
        this.menuBtns.forEach((btn) => {
            btn.classList.remove('selected');
        })
        btn.classList.add('selected')
    },
    displayPage(id) {
        this.main.innerHTML = '';
        switch(id) {
            case 'home':
                home.init();
                break
            case 'npcs':
                npcs.init();
                break
            case 'explo':
                explo.init();
                break
            case 'combat':
                combat.init();
                break
            case 'rules':
                rules.init();
                break
            case 'bestiary':
                bestiary.init();
                break
        }
    }
}

saturn.init()