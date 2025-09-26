import { roll, create } from "../utils.js";
import insanityData from './insanity.json' with { type: 'json' };

const insanity = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.bindEvents();
    },
    cacheDOM() {
        this.content = document.querySelector('#rulesPage');
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'insanity');
        this.title = create.element('h2', '', 'Folie', this.module);

        const desc = `En cas d’échec à son test de VOL, le personnage encaisse un Point de Folie. Si c’est un échec critique, il doit en encaisser deux. Les points de folie viennent ronger les points de fortune, les rendant inutilisable. Quand un personnage n’a plus de case de Point de Fortune libres, il sombre dans la folie.`;
        create.element('p', '', desc, this.module);

        create.element('h3', '', 'Éviter les points de folie', this.module);
        const desc2 = `- Relancer les dés en utilisant des points de Fortune pour essayer de réussir le test de VOL.`
        create.element('p', '', desc2, this.module);
        
        const desc3 = `- Aggraver un trait de caractère. C’est à dire, transformer un défaut (ou en tous cas en plus gros défaut) un trait de caractère que le personnage possède déjà.`
        create.element('p', '', desc3, this.module);

        create.hr(this.module)
        // this.chaosTitle = create.element('h3', '', 'Chaos', this.module);
        // this.chaos = create.element('input', 'sceneChaos', '', this.chaosTitle);
        // this.chaos.setAttribute('type', 'text')
        // this.chaos.value = '5'
        // create.hr(this.module)

        // this.moduleContent2 = create.element('div', 'moduleContent2', '', this.module);
        
        // COLUMN ONE
        // this.col1 = create.element('div', '', '', this.moduleContent2);
        // RESULT and BUTTON
        // this.mod = create.element('h3', '', 'Scène modifiée ?', this.col1);
        // this.result = create.element('div', 'result', '...', this.col1);
        // this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.col1);
        // this.rollBtn.classList.add('rollBtn')

        // COLUMN TWO
        // this.col2 = create.element('div', '', '', this.moduleContent2);
        // this.infoTable = document.createElement('table');
        // create.row(this.infoTable, `Type`, this.eventType, 0);
        // create.row(this.infoTable, `Mots clefs`, this.keyWords, 1);
        // create.row(this.infoTable, `Sens`, this.meaning, 2);
        // this.col2.appendChild(this.infoTable);
        // BUTTON
        // this.dataBtn = create.element('button', 'dataBtn', 'Roll', this.col2);
        // this.dataBtn.classList.add('rollBtn')


        this.content.appendChild(this.module);
    },
    bindEvents() {
        // this.cacheDOM();

        // this.rollBtn.addEventListener('click', () => {
        //     const value = this.isModified();
        //     this.result.innerHTML = value;
        // });

        // this.dataBtn.addEventListener('click', () => {
        //     this.roll();
        // });
    }
}

export { insanity }