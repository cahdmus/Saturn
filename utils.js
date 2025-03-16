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

    switch (socialClass) {
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
        const moduleBox = this.element('div', name, '');
        moduleBox.classList.add('module');

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
    row(table, title, itemValue, position) {
        const row = table.insertRow(position);
        const titleCell = row.insertCell(0);
        titleCell.classList.add('title');
        titleCell.innerHTML = title;
        if (typeof itemValue == 'object') {
            let index = 1;
            this.columnNum = Array.from(Object.values(itemValue)).length;

            for (const [key, value] of Object.entries(itemValue)) {
                let descCell = row.insertCell(index);
                (index == this.columnNum) ? descCell.classList.add('value') : descCell.classList.add('subValue');
                (index%2 == 0) ? descCell.classList.add('subValue') : descCell.classList.add('value');
                (key === 'desc') ? descCell.classList.add('smallerDesc') : false;
                descCell.innerHTML = value;
                index++
            }

        } else {
            const descCell = row.insertCell(1);
            descCell.classList.add('value');
            descCell.innerHTML = itemValue;
        }

    },
    hr(container) {
        const hr = document.createElement('hr');
        container.appendChild(hr);
    }
}

export { roll, getMoney, create }