import { create } from "../utils.js";
import rulesData from '../rules/rulesData.json' with { type: 'json' };
import { sceneGenerator } from '../scene/scene.js'
import { proficiency } from "../proficiency/proficiency.js";
import { insanity } from "../insanity/insanity.js";

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
        this.page = create.element('div', 'rulesPage', '', this.content);

        this.fillMenu()
    },
    fillMenu() {
        rulesData.forEach((rule) => {
            const ruleBtn = create.element('a', '', rule.name, this.menu);
            ruleBtn.classList.add('creatureBtn');

            ruleBtn.addEventListener('click', () => {
                // console.log(rule)
                this.page.innerHTML = '';
                this.fillPage(rule)
            })
        })
    },
    fillPage(rule) {
        switch (rule.id) {
            case 'scene':
                sceneGenerator.init()
                break
            case 'proficiency':
                proficiency.init()
                break
            case 'insanity':
                insanity.init()
                break
            default:
                this.generateRestOfDOM(rule)
                break
        }
    },
    generateRestOfDOM(rule) {
        this.title = create.element('h2', '', rule.name, this.page);
        (rule.subtitle != undefined) ? this.subtitle = create.element('h4', '', rule.subtitle, this.page) : false;

        if (rule.desc != undefined) {
            rule.desc.forEach((el) => {
                let elDOM

                if (el.type === 'table') {
                    (el.name != undefined) ? create.element('h3', '', el.name, this.page) : false;
                    elDOM = create.element('table', '', '', this.page);
                    const tableContent = el.value;
                    let index = 0;

                    tableContent.forEach((item) => {
                        create.row(elDOM, item.name, item.desc, index);
                        index++
                    })
                } else {
                    elDOM = create.element(el.type, '', el.value, this.page)
                }

                (el.class != undefined) ? elDOM.classList.add(el.class) : false;
            })
        }
    }
}

export { rules }