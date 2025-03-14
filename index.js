import { displayDice } from "./dice/dice.js";
import { yesOrNo } from "./yes or no/yesOrNo.js";
import { opposition } from "./opposition/opposition.js";
import { sceneGenerator } from "./scene/scene.js"
import { explorationGenerator } from "./exploration/exploration.js";
import { miscellaneousGenerator } from "./miscellaneous/miscellaneous.js";
import { letterGenerator } from "./letterGenerator/letterGenerator.js";
import { displayModule } from "./NPCGenerator/moduleDisplay.js";
import { displayModuleNPC } from "./NPCGenerator/moduleDisplayNPC.js";
import { randomBestiary } from "./bestiary/randomBestiary.js";
import { bestiary } from "./bestiary/bestiary.js";
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

const saturn = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.header = document.querySelector('header');
        this.main = document.querySelector('main');
        this.menuBtns = document.querySelectorAll('header button');
    },
    generateDOM() {
        // this.title = create.element('h1', '', 'Saturn', this.header);
        this.homeBtn = create.element('button', '', 'Accueil', this.header);
        this.homeBtn.classList.add('selected')
        this.npcs = create.element('button', '', 'Personnages', this.header);
        this.explo = create.element('button', '', 'Exploration', this.header);
        this.combat = create.element('button', '', 'Combat', this.header);
        this.rules = create.element('button', '', 'Règles', this.header);


        create.element('h2', '', 'Sup', this.main);
        create.element('p', '', 'Lorem', this.main);
    },
    bindEvents() {
        this.cacheDOM();

        this.menuBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log(btn.innerHTML)
                this.menuBtns.forEach((btn) => {
                    btn.classList.remove('selected');
                })
                btn.classList.add('selected')
            });
        });
    }
}

saturn.init()