import { NPCgenerator } from "./NPCmodule";

const displayNPC = {
    NPC: NPCgenerator.init(),
    init() {
        console.log(this.NPC);
        this.cacheDOM();
        this.generateDOM();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content')
    },
    generateDOM() {
        this.module = document.createElement('div');
        this.module.classList.add('module', 'npcGenerator');

        this.avatarContainer = document.createElement('div');
        this.avatarImg = document.createElement('img');
        this.avatarImg.setAttribute('src', this.NPC.avatar);
        this.avatarContainer.appendChild(this.avatarImg);
        this.module.appendChild(this.avatarContainer);

        this.name = document.createElement('h1');
        this.name.innerHTML = `${this.NPC.firstName} ${this.NPC.surname}`;
        this.module.appendChild(this.name);


        this.webPage.appendChild(this.module);
    }
}

export { displayNPC }