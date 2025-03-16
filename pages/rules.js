import { create } from "../utils.js";
import rulesData from '../rules/rulesData.json' with { type: 'json' };
import { sceneGenerator } from '../scene/scene.js'
import { proficiency } from "../proficiency/proficiency.js";

const rules = {
    init() {
        this.cacheDOM();
        this.generateDOM();
    },
    cacheDOM() {
        this.main = document.querySelector('main');
    },
    generateDOM() {
        create.element('h1', '', 'Règles', this.main)
        create.hr(this.main)
        this.content = create.element('div', 'rulesDisplay', '', this.main);
        this.menu = create.element('div', 'rulesMenu', '', this.content);
        this.page = create.element('div', 'rulesPage', 'Sélectionner une règles', this.content);

        this.fillMenu()
    },
    fillMenu() {
        rulesData.forEach((rule) => {
            const ruleBtn = create.element('a', '', rule.name, this.menu);
            ruleBtn.classList.add('creatureBtn');

            ruleBtn.addEventListener('click', () => {
                console.log(rule)
                this.page.innerHTML = '';
                // this.generateRestOfDOM(rule)
                this.fillPage(rule)
            })
        })
    },
    // generateRestOfDOM(rule) {
        
    //     this.title = create.element('h2', '', rule.name, this.page);
    //     (rule.subtitle != undefined) ? this.subtitle = create.element('h4', '', rule.subtitle, this.page) : false;

    //     if (rule.desc != undefined) {
    //         rule.desc.forEach((element) => {
    //             create.element(element.type, '', element.value, this.page)
    //         })
    //     }
    // },
    fillPage(rule) {
        switch(rule.id) {
            case 'scene':
                sceneGenerator.init()
                break
            case 'proficiency':
                proficiency.init()
                break
        }
    }
}

export { rules }