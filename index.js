import "./styles.css";
import { displayDice } from "./dice/dice.js";
import { yesOrNo } from "./yes or no/yesOrNo.js";
import { opposition } from "./opposition/opposition.js";
import { sceneGenerator } from "./scene/scene.js"
import { explorationGenerator } from "./exploration/exploration.js";
import { miscellaneousGenerator } from "./miscellaneous/miscellaneous.js";
import { letterGenerator } from "./letterGenerator/letterGenerator.js";
import { displayModule } from "./NPCGenerator/moduleDisplay.js";
import { displayModuleNPC } from "./NPCGenerator/moduleDisplayNPC.js";

if (process.env.NODE_ENV !== 'production') {
    console.log('-------------------------------------');
    console.log('Sup boi, we are in DEVELOPMENT MODE !');
    console.log('-------------------------------------');
}

// function component() {
//     const element = document.createElement('pre');
//     element.innerHTML = 'What we doin today ?';

//     return element;
// }

// document.body.appendChild(component());
// NPCgenerator.init();


displayModuleNPC.init('', 'NPCGenerator');
opposition.init();
yesOrNo.init();
displayDice.init();
letterGenerator.init();
sceneGenerator.init();
explorationGenerator.init();
miscellaneousGenerator.init();
displayModule.init('Machine à Monstres', 'monsterGenerator');