const roll = {
    dCustom(max) {
        return Math.floor(Math.random() * (max - 1 + 1) + 1);
    },
    d2() {
        return this.dCustom(2);
    },
    d4() {
        return this.dCustom(4);
    },
    d6() {
        return this.dCustom(6);
    },
    d8() {
        return this.dCustom(8);
    },
    d10() {
        return this.dCustom(10);
    },
    d12() {
        return this.dCustom(12);
    },
    d20() {
        return this.dCustom(20);
    },
    d100() {
        return this.dCustom(100);
    },
    from(list) {
        return list[Math.floor((Math.random() * list.length))];
    }
}


function getMoney(socialClass) {
    let multiplier = 1;
    let value = 10;
    // copper = 1, silver = 10, gold = 100

    switch(socialClass) {
        case 'pauper':
            multiplier = 1;
            value = 10;
            break;
        case 'poor':
            multiplier = 3;
            value = 10;
            break;
        case 'middle class':
            multiplier = 5;
            value = 10;
            break;
        case 'rich':
            multiplier = 7;
            value = 10;
            break;
        case 'elite':
            multiplier = 7;
            value = 100;
            break;

    }

    return multiplier * roll.d4() * value - roll.d10();
}

const create = {
    moduleBox(name) {
        const moduleBox = document.createElement('div');
        moduleBox.classList.add('module', name);

        return moduleBox;
    },
    element(type, id, content, container) {
        const element = document.createElement(type);
        (id.length > 0) ? element.setAttribute('id', id)
                            : element;
        (content != undefined) ? element.innerHTML = content 
                            : element;
        (container != undefined) ? container.appendChild(element) 
                            : element;

        return element
    },
    row(table, title, value, position){
        const row = table.insertRow(position);
        const titleCell = row.insertCell(0);
        titleCell.classList.add('title');
        titleCell.innerHTML = title;
        const descCell = row.insertCell(1);
        descCell.classList.add('value');
        descCell.innerHTML = value;
    },
    hr(container) {
        const hr = document.createElement('hr');
        container.appendChild(hr);
    }
}

export { roll, getMoney, create }