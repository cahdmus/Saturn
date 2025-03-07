import { roll, create } from "/src/utils.js";

const capacity = {
    init(container, type) {
        this.container = container
        this.type = type;
        this.generateDOM(this.container);
        this.cacheDOM(this.container.id);
        this.bindEvents();
        this.roll();
    },
    cacheDOM(id) {
        this.rollBtns = document.querySelectorAll(`#${id} .rollBtn`);
        this.archetype = document.querySelector('.animalArchetype .title').innerHTML;
        this.npcStats = document.querySelector('#npcGeneratorInfo');
        this.npcScore = document.querySelector('#npcGeneratorScore');
        this.monsterStats = document.querySelector('#monsterMachineInfo');
        this.monsterScore = document.querySelector('#npcGeneratorScore');
    },
    generateDOM() {
        this.module = create.element('div', `${this.container.id}Box`, '', this.container);
        this.module.classList.add('statGenerator');
        this.stats = create.element('h1', '', 'Caractéristiques', this.module);
        this.subtitle = create.element('h3', '', '', this.module);

        this.infoTable = document.createElement('table');
        this.infoTable.setAttribute('id', `${this.container.id}Info`);
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
        this.module.appendChild(this.infoTable);

        this.scoreTable = document.createElement('table');
        this.scoreTable.setAttribute('id', `${this.container.id}Score`);
        this.scoreTable.classList.add('smallTable');
        create.row(this.scoreTable, `Points de vie`, '', 0);
        create.row(this.scoreTable, `Bonus de force`, '', 1);
        this.module.appendChild(this.scoreTable);
    },
    bindEvents() {
        this.rollBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.id === 'npcRollBtn') {
                    this.type = 'npc';
                    this.roll(this.npcStats, this.npcScore);
                } else if (btn.id === 'monsterRollBtn') {
                    this.type='monster'
                    this.roll(this.monsterStats, this.monsterScore);
                }
            });
        })
    },
    roll(infoTable, scoreTable) {
        this.getStats();
        (infoTable === undefined) ? infoTable = this.infoTable : infoTable;
        (scoreTable === undefined) ? scoreTable = this.scoreTable : scoreTable;

        infoTable.rows[0].cells[1].innerHTML = this.COM.value
        infoTable.rows[1].cells[1].innerHTML = this.CNS.value
        infoTable.rows[2].cells[1].innerHTML = this.DIS.value
        infoTable.rows[3].cells[1].innerHTML = this.END.value
        infoTable.rows[4].cells[1].innerHTML = this.FOR.value
        infoTable.rows[5].cells[1].innerHTML = this.HAB.value
        infoTable.rows[6].cells[1].innerHTML = this.MAG.value
        infoTable.rows[7].cells[1].innerHTML = this.MVT.value
        infoTable.rows[8].cells[1].innerHTML = this.PER.value
        infoTable.rows[9].cells[1].innerHTML = this.SOC.value
        infoTable.rows[10].cells[1].innerHTML = this.SRV.value
        infoTable.rows[11].cells[1].innerHTML = this.TIR.value
        infoTable.rows[12].cells[1].innerHTML = this.VOL.value

        scoreTable.rows[0].cells[1].innerHTML = this.PV
        scoreTable.rows[1].cells[1].innerHTML = this.BF
    },
    getStats() {
        this.beast = this.getBeast();
        this.subtitle.innerHTML = this.getSubtitle();
        this.COM = { name: 'COM', value: this.basicCalc() };
        this.CNS = { name: 'CNS', value: this.basicCalc('beast') }; //
        this.DIS = { name: 'DIS', value: this.basicCalc() };
        this.END = { name: 'END', value: this.basicCalc() };
        this.FOR = { name: 'FOR', value: this.basicCalc() };
        this.HAB = { name: 'HAB', value: this.basicCalc('beast') }; //
        this.MAG = { name: 'MAG', value: this.magicCalc() };
        this.MVT = { name: 'MVT', value: this.basicCalc() };
        this.PER = { name: 'PER', value: this.basicCalc() };
        this.SOC = { name: 'SOC', value: this.basicCalc('beast') }; //
        this.SRV = { name: 'SRV', value: this.basicCalc('beast') }; //
        this.TIR = { name: 'TIR', value: this.basicCalc('beast') }; //
        this.VOL = { name: 'VOL', value: this.basicCalc() };
        
        this.archetypeBonus()

        this.PV = Math.round((this.FOR.value / 5) + (this.END.value / 5) + (this.VOL.value / 10));
        this.BF = Math.round(this.FOR.value / 10);
    },
    basicCalc(beast) {
        let limit;
        let result = 0;

        if (this.type === 'monster') {
            if (beast && this.beast === true) {
                limit = 0
            } else if (this.level == 1) {
                limit = 4
            } else if (this.level == 2) {
                limit = 9
            } else if (this.level == 3) {
                limit = 12
            }
        } else if (this.type === 'npc') {
            if (this.level == 1) {
                limit = 3
            } else if (this.level == 2) {
                limit = 7
            } else if (this.level == 3) {
                limit = 10
            }
        }

        for (let i = 0; i < limit; i++) {
            let dice = this.getDice(this.level);
            result += dice;
        }

        return result
    },
    getDice() {
        if (this.level == 1) {
            return roll.d12();
        } else if (this.level == 2 || this.level == 3) {
            return roll.d6();
        }
    },
    magicCalc() {
        let chance;

        if (this.level == 1) {
            return 0
        } else if (this.level == 2) {
            chance = roll.d10()
            if (chance === 1) {
                return 0
            } else {
                return roll.dCustom(15) + 14
            }
        } else if (this.level == 3) {
            chance = roll.d6()
            if (chance === 1) {
                return 0
            } else {
                return roll.dCustom(35) + 14
            }
        }
    },
    getLevel() {
        this.level = roll.dCustom(3);

        if (this.level == 1) {
            return (this.type === 'npc') ? 'Faible' : 'Inoffensif';
        } else if (this.level == 2) {
            return (this.type === 'npc') ? 'Moyen' : 'Dangereux';
        } else if (this.level == 3) {
            return (this.type === 'npc') ? 'Héroïque' : 'Mortel';
        }
    },
    getBeast() {
        let chance = roll.dCustom(3);
        return (chance === 3) ? false : true;
    },
    getSubtype() {
        if (this.type === 'monster') {
            this.subtype = (this.beast === false) ? 'Mythique' : 'Bête';
        }
    },
    getSubtitle() {
        const level = this.getLevel();
        this.getSubtype();
        return (this.subtype != undefined) ? `${level} - ${this.subtype}` : `${level}`;
    },
    archetypeBonus() {
        if (this.type === 'npc') {
            switch (this.archetype) {
                case 'Aigle':
                    this.updateSkill(this.VOL, 5)
                    break
                case 'Chat':
                    this.updateSkill(this.MVT, 5)
                    this.updateSkill(this.DIS, 5)
                    this.randomSkill(this.FOR, this.VOL, -5)
                    break
                case 'Chien':
                    this.randomSkill(this.END, this.PER, 5)
                    this.updateSkill(this.SOC, 5)
                    this.updateSkill(this.DIS, -5)
                    break
                case 'Coq':
                    this.updateSkill(this.COM, 5)
                    this.updateSkill(this.SOC, 5)
                    this.randomSkill(this.DIS, this.CNS, -5)
                    break
                case 'Corbeau':
                    this.randomSkill(this.DIS, this.SRV, 5)
                    this.updateSkill(this.VOL, 5)
                    this.updateSkill(this.SOC, -5)
                    break
                case 'Fourmi':
                    this.updateSkill(this.HAB, 5)
                    this.updateSkill(this.VOL, 5)
                    this.updateSkill(this.END, -5)
                    break
                case 'Hibou':
                    this.updateSkill(this.CNS, 5)
                    break
                case 'Lapin':
                    this.updateSkill(this.DIS, 5)
                    this.updateSkill(this.MVT, 5)
                    this.updateSkill(this.PER, 5)
                    this.updateSkill(this.COM, -5)
                    this.updateSkill(this.FOR, -5)
                    break
                case 'Lion':
                    this.updateSkill(this.COM, 5)
                    this.updateSkill(this.FOR, 5)
                    this.updateSkill(this.SOC, 5)
                    this.updateSkill(this.CNS, -5)
                    this.updateSkill(this.DIS, -5)
                    break
                case 'Loup':
                    this.updateSkill(this.COM, 5)
                    this.randomSkill(this.PER, this.SRV, 5)
                    this.updateSkill(this.SOC, -5)
                    break
                case 'Mouton':
                    this.updateSkill(this.HAB, 5)
                    this.updateSkill(this.PER, 5)
                    this.updateSkill(this.SOC, 5)
                    this.updateSkill(this.COM, -5)
                    this.updateSkill(this.VOL, -5)
                    break
                case 'Ours':
                    this.updateSkill(this.FOR, 10)
                    this.updateSkill(this.SOC, -5)
                    break
                case 'Porc':
                    this.updateSkill(this.FOR, 5)
                    this.updateSkill(this.END, 5)
                    this.randomSkill(this.MVT, this.CNS, -5)
                    break
                case 'Rat':
                    this.updateSkill(this.DIS, 5)
                    this.randomSkill(this.VOL, this.SRV, 5)
                    this.updateSkill(this.FOR, -5)
                    break
                case 'Renard':
                    this.updateSkill(this.MVT, 5)
                    this.updateSkill(this.SOC, 5)
                    this.randomSkill(this.COM, this.FOR, -5)
                    break
                case 'Serpent':
                    this.randomSkill(this.CNS, this.SOC, 5)
                    this.updateSkill(this.VOL, 5)
                    this.updateSkill(this.MVT, -5)
                    break
                case 'Singe':
                    this.updateSkill(this.MVT, 5)
                    this.updateSkill(this.SOC, 5)
                    this.randomSkill(this.COM, this.VOL, -5)
                    break
                case 'Souris':
                    this.updateSkill(this.DIS, 10)
                    this.updateSkill(this.SOC, 5)
                    this.updateSkill(this.COM, -5)
                    this.updateSkill(this.FOR, -5)
                    break
                case 'Taureau':
                    this.updateSkill(this.COM, 5)
                    this.updateSkill(this.FOR, 10)
                    this.updateSkill(this.DIS, -5)
                    this.updateSkill(this.CNS, -5)
                    break
                case 'Vautour':
                    this.updateSkill(this.CNS, 5)
                    this.updateSkill(this.END, 5)
                    this.updateSkill(this.SOC, -5)
                    break
                case 'Âne':
                    this.updateSkill(this.END, 5)
                    this.randomSkill(this.SRV, this.VOL, 5)
                    this.randomSkill(this.COM, this.TIR, -5)
                    break
                case 'Cerf':
                    this.updateSkill(this.SOC, 5)
                    this.updateSkill(this.VOL, 5)
                    this.randomSkill(this.DIS, this.TIR, -5)
                    break
                case 'Hyène':
                    this.randomSkill(this.COM, this.TIR, 5)
                    this.updateSkill(this.DIS, 5)
                    this.randomSkill(this.FOR, this.VOL, -5)
                    break
                case 'Paon':
                    this.randomSkill(this.CNS, this.PER, 5)
                    this.updateSkill(this.SOC, 5)
                    this.randomSkill(this.COM, this.FOR, -5)
                    break
            }
        }
    },
    updateSkill(skill, bonus) {
        // console.log(`with a bonus of ${bonus} ${skill.name} went from ${skill.value} to ${skill.value + bonus}`);
        return skill.value = skill.value + bonus
    },
    randomSkill(skill1, skill2, bonus) {
        let chance = roll.d2()
        // console.log(this.archetype)
        // console.log(skill1)
        // console.log(skill2)
        return (chance === 1) ? this.updateSkill(skill1, bonus) : this.updateSkill(skill2, bonus);
    }
}

export { capacity }
