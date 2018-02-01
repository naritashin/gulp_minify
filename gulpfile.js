var gulp = require('gulp'),
    // browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    newer = require('gulp-newer'),
    imgmin = require('gulp-imagemin'),
    imgminJpg = require('imagemin-jpeg-recompress'),
    imgminPng = require('imagemin-pngquant'),
    imgminGif = require('imagemin-gifsicle'),
    watch = require('gulp-watch');

gulp.task('imgmin', function () {
  return gulp.src('./src/imgs/*.{jpg,jpeg,png,gif}')
  // .pipe(changed('./src/imgs/*.{jpg,jpeg,png,gif}'))
  // .pipe(newer('./dist/imgs/*.{jpg,jpeg,png,gif}'))
  .pipe(imgmin([
    imgminJpg(),
    imgminPng(),
    imgminGif({
      interlanced: false,
      potimizationLevel: 3,
      color: 180
    })
  ]))
  .pipe(gulp.dest('./dist/imgs/'));
})

gulp.task('default', ['imgmin'], function () {
  var minify = this.tasks.imgmin;

  watch('./src/imgs/*.{jpg,jpeg,png,gif}', ['imgmin'])
  .on('change', minify.fn);
})
