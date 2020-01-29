// Подключаем модули
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');

// Определяем пути
const path = {
    src: {
        html: 'src/**/*.html',
        js: 'src/js/*.js',
        css: 'src/sass/*.scss',
        favicon: 'src/favicon.png'
    },
    build: {
        root: 'docs/',
        js: 'docs/js',
        css: 'docs/css'
    },
    clean: 'docs/'
};

// Удаление сборки
gulp.task('kill', function() {
    return del(path.clean);
});

// Сборка HTML
gulp.task('html', () => {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.root))
});

// Перенос Favicon
gulp.task('favicon', () => {
    return gulp.src(path.src.favicon)
        .pipe(gulp.dest(path.build.root))
});

// Сборка SASS
gulp.task('css', function() {
    return gulp.src(path.src.css)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.build.css))
});

// Сборка JS
gulp.task('js', function() {
    return gulp.src(path.src.js)
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
});

// Наблюдатель
gulp.task('watch', function() {
    gulp.watch(path.src.html, gulp.series('html'));
    gulp.watch(path.src.js, gulp.series('js'));
    gulp.watch(path.src.css, gulp.series('css'));
});

gulp.task('dev', gulp.series('kill', gulp.parallel('html', 'js', 'css', 'favicon'), 'watch'));
gulp.task('build', gulp.series('kill', gulp.parallel('html', 'js', 'css', 'favicon')));