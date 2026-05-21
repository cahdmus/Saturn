import { roll, create } from "../utils.js";

const payDay = {
    socialClass: {
        "pauper": { "village": `${roll.d4()} pièces de cuivre`, "town": `${roll.d8()+roll.d8()+roll.d8()} pièces de cuivre`, "city": `${roll.d10()} pièces d'argent`, "fr": "Miséreux"},
        "poor": { "village": `${roll.d10()+roll.d10()} pièces de cuivre`, "town": `${roll.d6()+roll.d6()} pièces d'argent`, "city": `${roll.d20()+roll.d20()+roll.d20()} pièces d'argent`, "fr": "Pauvre"},
        "middle class": { "village": `${roll.d4()} pièces d'argent`, "town": `${roll.d8()+roll.d8()+roll.d8()} pièces d'argent`, "city": `${roll.d12()} pièces d'or`, "fr": "Classe moyenne"},
        "rich": { "village": `${roll.d4()+roll.d4()} pièces d'argent`, "town": `${roll.d4()} pièces d'or`, "city": `${roll.d12()+roll.d12()} pièces d'or`, "fr": "Riche"},
        "elite": { "village": `${roll.d6()+roll.d6()+roll.d6()} pièces d'argent`, "town": `${roll.d6()+roll.d6()} pièces d'or`, "city": `${roll.d20()+roll.d20()+roll.d20()} pièces d'or`, "fr": "Elite"}
    },
    init() {
        this.makeDOM()
        return this.container
    },
    makeDOM() {
        this.container = create.moduleBox("payDay")
        const title = create.element("h1", "", "Jour de Paie", this.container)
        const descContent = "Combien les NPC vont payer le joueur après quelques heures ou une journée de travail ?";
        const desc = create.element("p", "", descContent, this.container);
        console.log(this.socialClass)
        
        
    }
}

export { payDay }


// PERFORMANCE
// - <9 1/2 earning
// - 10-14 base earnings
// - 15-20 x2
// - 21+ x2.5