import { roll, create } from "../utils.js";

const tripleO = {
    types: [
        { "name": "obvious", "desc": "The most likely thing to happen", "value": "" }, 
        { "name": "option", "desc": "A plausible option", "value": "" }, 
        { "name": "odd", "desc": "Something possible but a bit crazy", "value": "" }],
    init() {
        this.makeDOM()
        return this.container
    },
    makeDOM() {
        this.container = create.moduleBox("tripleO")
        this.container.classList.add("card")
        const title = create.element("h1", "", "Triple-O", this.container)
        const descContent = "Sometimes you are unsure of how a character will act. In these cases you can use the Triple-O method created by <a href =\"https://capacle.itch.io/triple-o\">Cezar Capacle</a>. It serves as a great character simulator. First decide on three outcomes, the most likely <em>(obvious)</em>, a possible outcome <em>(option)</em>, and a wildcard <em>(odd)</em>. Type them down bellow and click \"roll\" to see what happens !";
        const desc = create.element("p", "", descContent, this.container);
        this.types.forEach((type) => {
            create.element("label", "", type.name, this.container)
            const input = create.element("input", "", "", this.container);
            input.name = (type.name)
            input.placeholder = type.desc
        })
        const btn = create.element("button", "tripleOBtn", "roll", this.container);
        btn.classList.add("rollBtn")
        btn.addEventListener('click', () => {
            this.roll()
        });

        this.result = create.element("h2", "tripleOResult", "", this.container)
    },
    roll() {
        this.types.forEach((type) => {
            const inputs = document.querySelector(`input[name=${type.name}]`);
            type.value = inputs.value
        })
        const diceRoll = roll.d6()

        let result
        switch (diceRoll) {
            case 1:
                result = this.types[2].value
                break;
            case 2:
            case 3:
                result = this.types[1].value
                break;
            case 4:
            case 5:
            case 6:
                result = this.types[0].value
                break;
        }

        this.result.innerHTML = result
    }
}

export { tripleO }