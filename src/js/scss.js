// Рендер переменной SCSS
function variableSCSSLine(name, type, value, comment) {
    let commentAfter = '';
    if(comment) {
        commentAfter = `&nbsp;//&nbsp;${comment}`;
    }

    return `<div><span class="variable">$${name}</span>: <span class="${type}">${value}</span>;${commentAfter}</div>`;
};

// Рендер SCSS-условий (цикл, проверка условия, ect)
function scssFor(type, TypeParams, classes) {
    // Назначаем строку для кода
    let html = new String('');

    // Открываем группу по типу
    switch(type) {
        case 'for' : {
            html += `<div><span class="stylenames">@for <span class="variable">$i</span> from 1 through</span> <span class="variable">$column-count</span></span> {`;
            break;
        }
        case 'supports' : {
            html += `<div><span class="stylenames">@supports</span> ${TypeParams}{</div>`;
            break;
        }
    }
    
    // Вставляем классы по условию
    for(let i = 0; i < classes.length; i++) {
        html += classBlock(classes[i][0], classes[i][1], classes[i][2]);
    }

    // Закрываем группу и возвращаем получившийся код
    html += `<div>}</div>`;
    return html;
}

// Основные переменные и классы для SCSS
function baseSCSS() {
    // Назначаем строку для кода
    let html = new String('');

    // Выводим основные SCSS-переменные
    html += commentLine(locales[langLib].texts[6]);
    html += variableSCSSLine('content-width', 'number', `${document.getElementById('width').value}px`);
    html += variableSCSSLine('column-count', 'number', document.getElementById('colcounts').value);
    html += variableSCSSLine('column-spase', 'number', `${document.getElementById('colspase').value}px`);
    html += variableSCSSLine('column-width', '', '(<span class="variable">$content-width</span> / <span class="variable">$column-count</span>) - (<span class="variable">$column-spase</span> * <span class="number">2</span>)', `${baseColumn()}px`);

    // Выводим пустую строку
    html += clearLine();

    // Выводим комментарий для блока
    html += commentLine(locales[langLib].texts[7]);

    // Рендерим классы
    html += classBlock(0, document.getElementById('wrappername').value, [
        [4, 'width', 'number', `100%`]
    ]);
    html += classBlock(0, document.getElementById('rowname').value, [
        [4, 'width', 'variable', '$content-width']
    ]);

    // Выводим пустую строку и возвращаем результат
    html += clearLine();
    return html;
}

// Сетка SCSS
function gridSCSS() {
    // Назначаем строку для кода
    let html = new String('');

    // Выводим комментарий для блока
    html += commentLine(locales[langLib].texts[8]);

    // Рендерим SASS группу  
    html += scssFor('for', document.getElementById('colcounts').value, [
        [4, `${document.getElementById('colprefix').value}-#{<span class="variable">$i</span>}`, [
                [8, 'width', '', '(<span class="variable">$column-width</span> * <span class="variable">$i</span>) + ((<span class="variable">$i</span> - <span class="number">1</span>) * (<span class="variable">$column-spase</span> * <span class="number">2</span>))'],
                [8, 'margin', 'number', `0 ${document.getElementById('colspase').value}px`]
            ]
        ]
    ]);

    // Возвращаем результат
    return html;
}