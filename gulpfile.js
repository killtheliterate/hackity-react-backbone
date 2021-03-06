// GUUUUUUULLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLPPPPPPPPPPPPPPPPPPPPPPPPPPPP
// ----------------------------------------------------------------------------
var gulp = require('gulp');

// Gulp plugins
// ----------------------------------------------------------------------------
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');

// Error handling - http://bit.ly/1mNdCxd
// Run using $ gulp --fatal=off
// ----------------------------------------------------------------------------
var fatalLevel = require('yargs').argv.fatal;
var ERROR_LEVELS = ['error', 'warning'];

function isFatal(level) {
    return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}

function handleError(level, error) {
    gutil.log(error.message);
    if (isFatal(level)) {
        process.exit(1);
    }
}

function onError(error) { handleError.call(this, 'error', error);}

function onWarning(error) { handleError.call(this, 'warning', error);}

// Gulp Tasks
// ----------------------------------------------------------------------------
gulp.task('clean', function() {
    return gulp.src('./client/build/', {read: false})
    .pipe(clean());
});

gulp.task('connect', function() {
    connect.server({
        root: 'client'
    });
});

gulp.task('compass', function() {
    gulp.src('./client/sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'client/build/css',
            sass: 'client/sass',
            bundle_exec: true
        }))
        .pipe(gulp.dest('client/build/css/'));
});

gulp.task('lint', function() {
    return gulp.src('./client/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .on('error', onError);
});

gulp.task('scripts', function() {
    gulp.src('client/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            transform: ['reactify']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('client/build/js'));
});

gulp.task('watch', function() {
    fatalLevel = fatalLevel || 'off';

    gulp.watch([
        './client/js/*.js',
        './client/js/component/**/*.js',
        './client/js/component/**/*.jsx',
        './client/sass/*.scss',
        './client/sass/**/*.scss'
    ], [
        'clean',
        'lint',
        'scripts',
        'compass'
    ]);
});

// Default task
// ----------------------------------------------------------------------------
gulp.task('default', [
    'clean',
    'connect',
    'lint',
    'scripts',
    'compass',
    'watch'
]);
