// Рендер пустой строки
const baseColumn = () => {
    let width = document.getElementById('width').value,
        cols = document.getElementById('colcounts').value,
        spase = document.getElementById('colspase').value;

    return Number((width / cols) - (spase * 2));
}

// Рендер пустой строки
const clearLine = () => {
    return `<div>&nbsp;</div>`;
}

// Рендер строки комментариев
const commentLine = (text) => {
    return `<div class="comment">/* ${text} */</div>`
}

// Рендер комментария строки
const commentStroke = (text) => {
    return `<span class="comment">// ${text}</div>`
}

// Отступы
const lineSpaces = (num) => {
    // Назначаем строку для кода
    let html = new String('');

    if(num > 0) {
        for(let i = 0; i < num; i++) {
            html += '&nbsp;'
        }
    }
    
    return html;
}

// Рендер отдельного атрибута
const attributeLine = (spaces, attr, paramType, paramValue) => {
    return `<div>${lineSpaces(spaces)}<span class="attributes">${attr}</span>: <span class="${paramType}">${paramValue}</span>;</div>`;
};

// Рендер класса
function classBlock(spaces, className, attributes) {
    // Назначаем строку для кода
    let html = new String('');

    //  Открываем класс
    html += `<div>${lineSpaces(spaces)}<span class="stylenames">.${className}</span> {</div>`;

    // Выводим все атрибуты класса
    for(let i = 0; i < attributes.length; i++) {
        html += attributeLine(attributes[i][0], attributes[i][1], attributes[i][2], attributes[i][3])
    }
    
    // Закрываем класс и возвращаем получившийся код
    html += `<div>${lineSpaces(spaces)}}</div>`;
    return html;
}

// Рендер результата
function render() {
    let html = new String('');
    // Установленный процессор
    let processor = localStorage.getItem('gc-proc');

    // В зависимости используем нужный процессор / препроцессор
    switch(processor) {
        case 'CSS' : {
            html += baseCSS();
            html += gridCSS();
            break;
        }
        case 'SCSS' : {
            html += baseSCSS();
            html += gridSCSS();
            break;
        }
    }

    // Вставляем исходник
    result.innerHTML = html;
}