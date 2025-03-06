import { roll, create } from "/src/utils.js";

const capacity = {
    init(container) {
        this.stats = create.element('h1', '', 'Caractéristiques', container);
        
        this.infoTable = document.createElement('table');
        create.row(this.infoTable, `Combat`, '', 0);
        create.row(this.infoTable, `Connaisances`, '', 1);
        create.row(this.infoTable, `Discrétion`, '', 2);
        create.row(this.infoTable, `Endurance`, '', 3);
        create.row(this.infoTable, `Force`, '', 4);
        create.row(this.infoTable, `Habileté`, '', 5);
        create.row(this.infoTable, `Magie`, '', 6);
        create.row(this.infoTable, `Mouvement`, '', 7);
        create.row(this.infoTable, `Perception`, '', 8);
        create.row(this.infoTable, `Sociabilité`, '', 9);
        create.row(this.infoTable, `Survie`, '', 10);
        create.row(this.infoTable, `Tir`, '', 11);
        create.row(this.infoTable, `Volonté`, '', 12);
        container.appendChild(this.infoTable);
        
        this.scoreTable = document.createElement('table');
        this.scoreTable.classList.add('smallTable');
        create.row(this.scoreTable, `Niveau`, '', 0);
        create.row(this.scoreTable, `Points de vie`, '', 1);
        create.row(this.scoreTable, `Bonus de force`, '', 2);
        container.appendChild(this.scoreTable);
    },
    getStat() {

    }
}

export { capacity }

// NPC
// weak roll.d12() + roll.d12() + roll.d12()
// -- magic 0
// normal roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6()
// -- magic roll.d10() if result = 1 roll.dcustom(15) + 14
// heroic roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6()
// -- magic roll.d6() if result = 1 roll.dcustom(35) + 14

// MONSTER
// weak roll.d12() + roll.d12() + roll.d12() + roll.d12()
// -- magic 0
// normal roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() 
// -- magic roll.d10() if result = 1 roll.dcustom(15) + 14
// heroic roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6() + roll.d6()
// -- magic roll.d6() if result = 1 roll.dcustom(35) + 14
// CON, HAB, SOC, SRV, TIR
// -- Mythique + Inoffensif roll.d12() + roll.d12() + roll.d12() + roll.d12()
// -- Mythique + Dangereux roll.d6() * 9
// -- Mythique + Mortel Dangereux roll.d6() * 12
// -- Bête + whatever 0