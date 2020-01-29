// Библиотека локализации
const locales = [
    {
        locale: 'en',
        texts: [
            'Wrapper name',
            'Container name',
            'Column prefix',
            'Content Width',
            'Number of columns',
            'Column Interval',
            'Main variables',
            'Main containers',
            'Grid columns'
        ]
    },
    {
        locale: 'ru',
        texts: [
            'Название блока-обертки',
            'Контейнер колонок',
            'Префикс колонок',
            'Ширина контента',
            'Количество колонок',
            'Межколоночный интервал',
            'Основные переменные',
            'Основные контейнеры',
            'Колонки для сетки'
        ]
    }
]

function loadUI() {
    // Загружаем язык приложения
    window.langLib = langSet();
    
    // Код приложения
    const html = `<section class="toggles"><div class="generator"><h1>Grid Composer</h1>${processorUI()}<hr><label><span>${locales[langLib].texts[0]}</span><input class="watcher" id="wrappername" type="text" value="wrapper"></label><label><span>${locales[langLib].texts[1]}</span><input class="watcher" id="rowname" type="text" value="row"></label><label><span>${locales[langLib].texts[2]}</span><input class="watcher" id="colprefix" type="text" value="col"></label><hr><label><span>${locales[langLib].texts[3]}</span><input class="watcher" id="width" type="number" step="10" value="1000"></label><label><span>${locales[langLib].texts[4]}</span><input class="watcher" id="colcounts" type="number" min="1" value="4"></label><label><span>${locales[langLib].texts[5]}</span><input class="watcher" id="colspase" type="number" min="1" value="10"></label></div><div class="settings">${settingsUI()}</div></section><section class="outputarea"><pre class="${setColor()}"><code id="result"></code></pre></section>`;

    // Вставляем приложение
    document.getElementById('root').innerHTML = html;

    // Устанавливаем цветовую схему
    setColorButton();

    // Устанавливаем сохраненное положение и подключаем переключение процессора
    setProcessor();
    document.getElementById('processor').addEventListener('change', () => {
        switchProcessor();
    });
}
// Кнопки настройки внешнего вида
function settingsUI() {
    let html = `<div class="toggle_color"><label class="dark"><input type="radio" name="color" value="dark" onChange="switchColor('dark')"><span></span></label><label class="white"><input type="radio" name="color" value="white" onChange="switchColor('white')"><span></span></label><label class="mono"><input type="radio" name="color" value="mono" onChange="switchColor('mono')"><span></span></label></div>`;

    return html;
}

// Выбор процессора
function processorUI() {
    let html = `<label><select class="watcher" id="processor"><option>CSS</option><option>SCSS</option></select></label>`;

    return html;
}

// Установка переключателя процессора
function setProcessor() {
    let processor = 'CSS';

    if(localStorage.getItem('gc-proc')) {
        processor = localStorage.getItem('gc-proc');
    } else {
        localStorage.setItem('gc-proc', processor);
    }

    return document.getElementById('processor').value = processor;
}

// Переключение процессора
function switchProcessor() {
    let processor = document.getElementById('processor').value;

    localStorage.setItem('gc-proc', processor);
}

// Язык приложения
function langSet() {
    // Устанавливаем язык браузера
    let lang = new String();

    if(localStorage.getItem('gc-lang')) {
        lang = localStorage.getItem('gc-lang');
    } else {
        lang = navigator.language;
        localStorage.setItem('gc-lang', lang);
    }

    document.getElementsByTagName('html')[0].lang = lang;

    // Ищем библиотеку по установленной локали 
    let langIndex = 0;
    for(let i = 0; i < locales.length; i++) {
        if(lang == locales[i].locale) {
            langIndex = i;
        }
    }

    // Возвращаем индекс библиотеки
    return langIndex;
}

// Цветовая палитра
function setColor() {
    // Схема по-умолчанию
    let colorScheme = 'dark';

    // Есть ли в сохраненках
    if(localStorage.getItem('gc-color')) {
        colorScheme = localStorage.getItem('gc-color');
    }

    localStorage.setItem('gc-color', colorScheme);

    return `code-${colorScheme}`;
}
function switchColor(color) {
    let nextColor = 'code-' + color;
    let preClass = document.getElementsByTagName('pre')[0].classList;
    let currentColor = preClass.value;
    preClass.remove(currentColor);
    preClass.add(nextColor);
    localStorage.setItem('gc-color', color);
}

function setColorButton() {
    let colorScheme = localStorage.getItem('gc-color');

    let colorSwitchers = document.getElementsByName('color');

    for(let i = 0; i < colorSwitchers.length; i++) {
        if(colorSwitchers[i].value == colorScheme) {
            colorSwitchers[i].checked = true;
        }
    }
}