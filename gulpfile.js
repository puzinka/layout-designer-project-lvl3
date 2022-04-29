const { src, dest, parallel } = require('gulp');
const { watch } = require('gulp');
const { series } = require('gulp-cli/lib/shared/cli-options');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
    browserSync.init({
      server: "build/"
    });
  
    watch('app/sass/*.scss', buildSass);
    watch('app/pug/*.pug', buildPug);
};

const buildSass = () => {
  console.log('Компиляция SASS');

  return src('app/sass/*.scss')
    .pipe(sass())
    .pipe(dest('build/style/'))
    .pipe(browserSync.stream());
}

const buildPug = () => {
  console.log('Компиляция Pug');

  return src('app/pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

exports.default = parallel(buildSass, buildPug);
exports.server = browserSyncJob;
exports.build = parallel(buildSass, buildPug);