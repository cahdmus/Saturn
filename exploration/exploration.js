import { roll, create } from "../utils.js";
import explorationData from './explorationData.json' with { type: 'json' };

const explorationGenerator = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.roll(),
        this.bindEvents();
    },
    cacheDOM() {
        this.webPage = document.querySelector('#content');
        this.cells = document.querySelectorAll('#sceneGenerator table .value')
    },
    roll() {
        this.infoTable.rows[0].cells[1].innerHTML = this.getWeather();
        this.infoTable.rows[1].cells[1].innerHTML = this.getHour();
        this.infoTable.rows[2].cells[1].innerHTML = this.getDensity();
        this.infoTable.rows[3].cells[1].innerHTML = this.getType();
        this.infoTable.rows[4].cells[1].innerHTML = this.getDesc();
        this.infoTable.rows[5].cells[1].innerHTML = this.getCitySpot();
        this.infoTable.rows[6].cells[1].innerHTML = this.getCountrySpot();
        this.exploImg.setAttribute('src', `exploration/images/${this.getImage()}`);
    },
    bindEvents() {
        this.cacheDOM();

        this.rollBtn.addEventListener('click', () => {
            this.roll();
        })
    },
    generateDOM() {
        // THE BOX
        this.module = create.moduleBox('dice');
        this.module.setAttribute('id', 'sceneGenerator');

        // IMAGE
        this.imageContainer = create.element('div', '', '', this.module);
        this.imageContainer.classList.add('imageContainer');
        this.exploImg = create.element('img', '', '', this.imageContainer);

        this.title = create.element('h1', '', 'Exploration', this.module);

        this.infoTable = document.createElement('table');
        create.row(this.infoTable, `Météo`, '', 0);
        create.row(this.infoTable, `Heure`, '', 1);
        create.row(this.infoTable, `Densité`, '', 2);
        create.row(this.infoTable, `Type`, '', 3);
        create.row(this.infoTable, `Lieu de ville`, '', 4);
        create.row(this.infoTable, `Lieu de campagne`, '', 5);
        create.row(this.infoTable, `Description`, '', 6);
        this.module.appendChild(this.infoTable);

        // BUTTON
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);

        this.webPage.appendChild(this.module);
    },
    getWeather() {
        return roll.from(explorationData.weather);
    },
    getHour() {
        return roll.from(explorationData.hour)
    },
    getDensity() {
        return roll.from(explorationData.density)
    },
    getType() {
        const types = Object.keys(explorationData.type);
        const type = roll.from(types);
        let text;

        if (type == 'ville') {
            this.type = 'city';
            const subtype = roll.from(explorationData.type.ville.type);
            const population = this.getPopulation(subtype);
            const houses = this.getHouses(subtype, population)

            text = `${subtype}<br>${Math.round(population)} habitants
                    <br>${Math.round(houses)} maisons`
        } else if (type == 'campagne') {
            this.type = 'country';
            text = 'Campagne'
        }

        return text
    },
    getCitySpot() {
        return roll.from(explorationData.type.ville.place);
    },
    getCountrySpot() {
        return roll.from(explorationData.type.campagne);
    },
    getDesc() {
        return roll.from(explorationData.desc)
    },
    getPopulation(type) {
        let population; 

        if (type == 'Lieu-dit') {
            population = roll.d20();
        } else if (type == 'Hammeau') {
            population = roll.d20() * 9;
        } else if (type == 'Village') {
            population = roll.d6() + roll.d6() * 99 + 20;
        } else if (type == 'Petite ville') {
            population = (roll.d100() + 20) * 99;
        } else if (type == 'Grande ville') {
            population = (roll.d20() + 10) * 99;
        } else if (type == 'Métropole') {
            population = roll.d4() + roll.d4() * 9999;
        }

        return population
    },
    getHouses(type, population) {
        let houses; 

        if (type == 'Lieu-dit') {
            houses = roll.d4();
        } else if (type == 'Hammeau') {
            houses = roll.d20() + 5;
        } else if (type == 'Village' || type == 'Petite ville' 
                || type == 'Grande ville' || 'Métropole') {
            houses = population / 9
        }

        return houses
    },
    getImage() {
        // console.log(this.type)
        const allImages = explorationData.images;
        let filteredList = allImages.filter((image) => image.tags.includes(this.type));
        const image = roll.from(filteredList);
        // console.log(filteredList)

        return (image === undefined) ? '2d33eab85deaef8ccc9a5f48186ccb1e.jpg': image.url;
    }
}

export { explorationGenerator }