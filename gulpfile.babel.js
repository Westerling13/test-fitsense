'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import panini        from 'panini';
import rimraf        from 'rimraf';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import uncss         from 'uncss';
import autoprefixer  from 'autoprefixer';

// Переменная для всех плагинов гальпа
const $ = plugins();

// Берём пути и порт из переменной loadConfig
const PRODUCTION = !!(yargs.argv.production);

// Грузим наш конфиг из файла ./config.yml переменные находятся в нём же
const { COMPATIBILITY, PORT, PATHS, UNCSS_OPTIONS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Создаёт папку dist, запуская данные таски, sass в самом конце,
// потому что там работает ещё unCSS, который удаляет не используемые стили
gulp.task('build',
 gulp.series(clean, gulp.parallel(pages, javascript, images, copy), sass)
);

// Делаёт таск build, запускает локальный сервер и следит за изменениями файлов
gulp.task('default',
  gulp.series('build', server, watch)
);

// Таск на удаление папки dist
// Она будет удаляться каждый раз, когда будет запускаться сборка
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Копирование всех файлов в папку dist
// Игнорирует папку assets и всё что в ней, для них отдельные таски
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}

// Собирает все html файлы по проекту, компилит их всех в один файл и выкидывает в dist
function pages() {
  return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest(PATHS.dist));
}

// Загружает новый страницы и части страниц из Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Собирает файлы SASS в CSS
// Если production, то минимайз для CSS файла
function sass() {

  const postCssPlugins = [
    // Autoprefixer
    autoprefixer({ browsers: COMPATIBILITY }),

    // UnCSS - для удаления не используемых стилей в CSS, только если production
    PRODUCTION && uncss.postcssPlugin(UNCSS_OPTIONS),
  ].filter(Boolean);

  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.postcss(postCssPlugins))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
    .pipe(browser.reload({ stream: true }));
}

let webpackConfig = {
  mode: (PRODUCTION ? 'production' : 'development'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ "@babel/preset-env" ],
            compact: false
          }
        }
      }
    ]
  },
  devtool: !PRODUCTION && 'source-map'
};

// Комбинирует все js файлы в один без минимайз!
// Если production, то минимайз для js файлов
function javascript() {
  return gulp.src(PATHS.entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}

// Копирует все картинки в dist папку без imagemin!
// Если production, то использует imagemin
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin([
      $.imagemin.jpegtran({ progressive: true }),
    ])))
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}

// Таск для запуска локального сервера BrowserSync
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  }, done);
}

// Таск для перезагрузки страницы BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Таск, чтобы следил за изменениями в файлах assets, pages, sass и js
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/data/**/*.{js,json,yml}').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/helpers/**/*.js').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', sass);
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
}
