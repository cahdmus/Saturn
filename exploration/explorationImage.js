import { roll, create } from "../utils.js";
import explorationData from './explorationData.json' with { type: 'json' };

const explorationImage = {
    init() {
        this.cacheDOM();
        this.generateDOM();
        this.roll(),
        this.bindEvents();
    },
    cacheDOM() {
        this.content = document.querySelector('#exploContent');
    },
    roll() {
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
        this.module = create.moduleBox('imageGenerator');
        this.module.classList.add('card');

        // IMAGE
        this.imageContainer = create.element('div', '', '', this.module);
        this.imageContainer.classList.add('imageContainer');
        this.exploImg = create.element('img', '', '', this.imageContainer);

        // BUTTON
        this.rollBtn = create.element('button', 'rollBtn', 'Roll', this.module);
        this.rollBtn.classList.add('rollBtn');

        this.content.appendChild(this.module);
    },
    getImage() {
        // console.log(this.type)
        const allImages = explorationData.images;
        // let filteredList = allImages.filter((image) => image.tags.includes(this.type));
        // const image = roll.from(filteredList);

        const image = roll.from(allImages);
        // console.log(filteredList)

        return (image === undefined) ? '2d33eab85deaef8ccc9a5f48186ccb1e.jpg': image.url;
    }
}

export { explorationImage }