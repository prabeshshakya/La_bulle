// Defining base pathes
var basePaths = {
    dev: './src/'
};


// browser-sync watched files
// automatically reloads the page when files changed
var browserSyncWatchFiles = [
    './dist/css/*.min.css',
    './dist/js/*.min.js',
    './**/*.php'
];


// browser-sync options
// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
    proxy: "http://localhost/zalivako/"
};


// Defining requirements
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge2 = require('merge2');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var clone = require('gulp-clone');
var merge = require('gulp-merge');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var del = require('del');

// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task('sass', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});


// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./dist/css/theme.css', ['cssnano']);
    gulp.watch([basePaths.dev + 'js/**/*.js', 'js/**/*.js', '!js/theme.js', '!js/theme.min.js'], ['scripts'])
});


// Run:
// gulp cssnano
// Minifies CSS files
gulp.task('cssnano', ['cleancss'], function() {
    return gulp.src('./dist/css/theme.css')
        // .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(plumber())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano({ discardComments: { removeAll: true } }))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('cleancss', function() {
    return gulp.src('./dist/css/*.min.css', { read: false }) // much faster
        .pipe(ignore('theme.css'))
        .pipe(rimraf());
});


// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});


// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task('watch-bs', ['browser-sync', 'watch', 'cssnano', 'scripts'], function() {});


// Run: 
// gulp scripts. 
// Uglifies and concat all JS files into one
gulp.task('scripts', function() {
    var scripts = [
        basePaths.dev + 'js/jquery.min.js',
        basePaths.dev + 'js/popper.min.js',
        basePaths.dev + 'js/bootstrap.min.js',
        basePaths.dev + 'js/**/!(site)*.js',
        basePaths.dev + 'js/site.js'
    ];
    gulp.src(scripts)
        .pipe(concat('theme.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));

    gulp.src(scripts)
        .pipe(concat('theme.js'))
        .pipe(gulp.dest('./dist/js/'));
});