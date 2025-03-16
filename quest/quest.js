import questData from './questData.json' with { type: 'json' };
import NPCdata from '../NPCGenerator/NPCdata.json' with { type: 'json'};
import { roll, create } from "../utils.js";

// TO BE REWORKED
// Because a lot of the pieces of the sentences don't really go together than well

const quest = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.roll(),
        this.bindEvents();
    },
    cacheDOM() {
        this.content = document.querySelector('#exploContent');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('quests');
        this.module.classList.add('card');

        this.questTitle = create.element('h2', '', 'Quête', this.module);
        this.quest = create.element('p', '', '', this.module);
        
        create.hr(this.module)

        this.rumorTitle = create.element('h2', '', 'Rumeur', this.module);
        this.rumor = create.element('p', '', '', this.module);

        // BUTTON
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);
        this.rollBtn.classList.add('rollBtn');

        this.content.appendChild(this.module);
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        })
    },
    roll() {
        this.quest.innerHTML = this.rollQuest();
        this.rumor.innerHTML = this.rollRumor();
        
    },
    rollQuest() {
        return `Un-e ${roll.from(NPCdata.archetype.role)} ${roll.from(NPCdata.attitude)} demande aux personnages ${roll.from(questData.verb)} ${roll.from(questData.subject)} ${roll.from(questData.feature)}, ${roll.from(questData.deadline)} en échange ${this.rollReward()}.`
    },
    rollRumor() {
        return `Un-e ${roll.from(NPCdata.archetype.role)} ${roll.from(NPCdata.attitude)} ${roll.from(questData.action)} ${roll.from(questData.subject)} ${roll.from(questData.feature)} ${roll.from(questData.preposition)} ${roll.from(questData.place)} ${roll.from(questData.placeAdj)}`
    },
    rollReward() {
        const reward = roll.from(questData.reward);

        if (reward.includes('*')) {
            const items = reward.split(' * ')
            const dice = roll.dCustom(items[0].split('')[1]);
            const multiplicator = items[1];

            return `${dice * multiplicator} pièces d'or`
        } else {
            return reward
        }
    }
}

export { quest }