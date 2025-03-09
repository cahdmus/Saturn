import { roll } from "/utils.js";

class StatBlock {
    constructor(type) {
        this.data = { type: type,
                    isBeast: this.isBeastRoll()}
        this.subtype = this.subtypeValue();
        this.level = this.calcLevel();
        this.COM = { name: 'Combat', value: this.calcStat()};
        this.CNS = { name: 'Connaisances', value: this.filteredCalc()};
        this.DIS = { name: 'Discrétion', value: this.calcStat()};
        this.END = { name: 'Endurance', value: this.calcStat()};
        this.FOR = { name: 'Force', value: this.calcStat()};
        this.HAB = { name: 'Habileté', value: this.filteredCalc()};
        this.MAG = { name: 'Magie', value: this.calcMagic()};
        this.MVT = { name: 'Mouvement', value: this.calcStat()};
        this.PER = { name: 'Perception', value: this.calcStat()};
        this.SOC = { name: 'Sociabilité', value: this.filteredCalc()};
        this.SRV = { name: 'Survie', value: this.filteredCalc()};
        this.TIR = { name: 'Tir', value: this.filteredCalc()};
        this.VOL = { name: 'Volonté', value: this.calcStat()};
        this.PV = { name: 'Points de vie', value: this.calcPV()};
        this.BF = { name: 'Bonus de force', value: this.calcBF()};
    }

    get limit() {
        if (this.level.value == 1) {
            return (this.data.type === 'monster') ? 4 : 3;
        } else if (this.level.value == 2) {
            return (this.data.type === 'monster') ? 9 : 7;
        } else if (this.level.value == 3) {
            return (this.data.type === 'monster') ? 12 : 10;
        }
    }

    get dice() {
        return (this.level.value == 1) ? roll.d12() : roll.d6();
    }
    
    get chance() {
        return (this.level.value == 2) ? roll.d10() : roll.d6();
    }

    // METHODS
    calcLevel() {
        let chance = roll.dCustom(3)
        let text;

        if (chance == 1) {
            text = (this.data.type === 'monster') ? 'Inoffensif' : 'Faible';
        } else if (chance == 2) {
            text = (this.data.type === 'monster') ? 'Dangereux' : 'Moyen';
        } else if (chance == 3) {
            text = (this.data.type === 'monster') ? 'Mortel' : 'Héroïque';
        }

        return { text, value: chance }
    }
    calcPV() {
        return Math.round((this.FOR.value / 5) + (this.END.value / 5) + (this.VOL.value / 10))
    }

    calcBF() {
        return Math.round(this.FOR.value / 10)
    }
    filteredCalc() {
        return (this.data.type === 'monster') ? this.beastCalc() : this.calcStat()
    }
    calcStat() {
        let result = 0;
        for (let i = 0; i < this.limit; i++) {
            result += this.dice;
        }
        return result
    }
    calcMagic() {
        if (this.level.value == 1) {
            return 0
        } else if (this.level.value == 2) {
            return (this.chance == 1) ? roll.dCustom(15) + 14 : 0
        } else if (this.level.value == 3) {
            return (this.chance == 1) ? roll.dCustom(35) + 14 : 0
        }
    }
    isBeastRoll() {
        return (roll.dCustom(3) == 3) ? false : true;
    }
    beastCalc() {
        return (this.data.isBeast === true) ? 0 : this.calcStat();
    }
    subtypeValue() {
        if (this.data.type === 'monster') {
            return (this.data.isBeast === true) ? 'Bête' : 'Mythique';
        } else {
            return 'none'
        }
    }
}

export { StatBlock }