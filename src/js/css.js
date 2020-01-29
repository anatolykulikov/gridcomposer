// Основные  классы для CSS
function baseCSS() {
    // Назначаем строку для кода
    let html = new String('');

    // Выводим комментарий для блока
    html += commentLine(locales[langLib].texts[7]);

    // Рендерим классы
    html += classBlock(0, document.getElementById('wrappername').value, [
        [4, 'width', 'number', `100%`]
    ]);
    html += classBlock(0, document.getElementById('rowname').value, [
        [4, 'width', 'number', `${document.getElementById('width').value}px`]
    ]);

    // Выводим пустую строку и возвращаем результат
    html += clearLine();
    return html;
}

// Сетка CSS
function gridCSS() {
    // Назначаем строку для кода
    let html = new String('');

    // Выводим комментарий для блока
    html += commentLine(locales[langLib].texts[8]);

    let columnPrefix = document.getElementById('colprefix').value;
    let columnCount = document.getElementById('colcounts').value;
    let columnSpase = document.getElementById('colspase').value;
    let columnWidth = baseColumn();

    for(let i = 1; i <= columnCount; i++) {
        
        let currentColumnWidth = (columnWidth * i) + ((i - 1) * (columnSpase * 2));

        html += classBlock(0, `${columnPrefix}-${i}`, [
            [4, 'width', 'number', `${currentColumnWidth}px`],
            [4, 'margin', 'number', `0 ${columnSpase}px`]
        ]);

    }

    // Выводим пустую строку и возвращаем результат
    return html;
}