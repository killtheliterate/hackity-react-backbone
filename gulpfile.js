var gulp = require('gulp');

var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('clean', function() {
    return gulp.src('./client/build/', {read: false})
        .pipe(clean());
});

gulp.task('connect', function() {
    connect.server({
        root: 'client'
    });
});

gulp.task('lint', function() {
    return gulp.src('./client/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    gulp.src('client/js/app.js')
        .pipe(browserify({
            debug : !gulp.env.production,
            insertGlobals : true,
            transform: ['reactify']
        }))
        .pipe(gulp.dest('client/build'));
});

gulp.task('watch', function() {
  gulp.watch([
      './client/js/*.js',
      './client/js/component/**/*.js',
      './client/js/component/**/*.jsx'
      ], [
        'clean',
        'lint',
        'scripts',
    ]);
});

gulp.task('default', [
    'clean',
    'connect',
    'lint',
    'scripts',
    'watch'
]);
