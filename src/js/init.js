function init() {
    // Загружаем интерфейс
    loadUI();

    // Навешиваем смотрителей
    let watchInputs = document.getElementsByClassName('watcher');
    for(let i = 0; i < watchInputs.length; i++) {
        watchInputs[i].addEventListener('change', render);
    }

    // Производим первичный рендер
    render();
}