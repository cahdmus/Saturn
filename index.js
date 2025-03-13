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

displayModuleNPC.init('', 'NPCGenerator');
opposition.init();
yesOrNo.init();
displayDice.init();
letterGenerator.init();
sceneGenerator.init();
explorationGenerator.init();
miscellaneousGenerator.init();
displayModule.init('Machine à Monstres', 'monsterGenerator');
randomBestiary.init();
bestiary.init();
quest.init();
proficiency.init()
combatEmulator.init()