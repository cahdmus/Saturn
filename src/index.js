import "./styles.css";
import { displayNPC } from "./NPCgenerator/NPCdom.js";
import { displayDice } from "./dice/dice.js";
import { yesOrNo } from "./yes or no/yesOrNo.js";
import { opposition } from "./opposition/opposition.js";
import { scene, sceneGenerator } from "./scene/scene.js"

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


displayNPC.init();
opposition.init();
yesOrNo.init();
sceneGenerator.init();
displayDice.init();