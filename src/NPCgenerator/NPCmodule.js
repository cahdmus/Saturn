import { getHostname } from "webpack-dev-server"

const namesArr = []

class Name {
    constructor(name, genders) {
        this.name = name;
        this.genders = genders;
    }
}

const NPCgenerator = {
    init() {
        console.log('sup')
    },
    getName() {

    },
    addName() {
        new Name()
    }
}

export { NPCgenerator }