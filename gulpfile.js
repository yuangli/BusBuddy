const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const reload = browserSync.reload;
const del = require('del');

gulp.task('default', ['live']);

gulp.task('html', () => {
  del(['./dist/*.html']);
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', () => {
  del(['./dist/css/*.+(css|map)']);
  return gulp.src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', () => {
  del(['./dist/js/*.+(js|map)']);
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify({mangle:true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('img', () => {
  del(['./dist/img/*']);
  return gulp.src('src/img/*')
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('live', ['html', 'css', 'js', 'img'], function() {
    browserSync.init({
        server: "./dist/"
    });
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch(['./src/js/*.js','./src/css/*.css', './src/index.html']).on('change', browserSync.reload);
});
