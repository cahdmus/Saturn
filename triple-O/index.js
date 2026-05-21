import { roll, create } from "../utils.js";

const tripleO = {
    types: [{"name":"obvious", "value"}, {"name":"option", "value"}, {"name":"odd", "value"}],
    init(container) {
        container.appendChild(this.makeDOM(container))
        
    },
    makeDOM(parentContainer) {
        const container = create.moduleBox("tripleO");
        const title = create.element("h1", "tripleOTitle", "NPC Behaviour", container); 
        const descContent = "sup";
        const desc = create.element("p", "tripleODesc", descContent, container); 
        this.types.forEach((type) => {
            create.element("input", type, "", container);
        })
        const btn = create.element("button", "tripleOBtn", "roll", container);
        btn.classList.add('rollBtn')

        return container
    }

}

export { tripleO }

// three text inputs "Obvious", "Option", "Odd"
// roll a D6 
// if 1 = odd
// if 2-3 = option
// if 4-6 = "obvious"
// display result
// NPC simulator what could they do in this situation, you give three option then bam