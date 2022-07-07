// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');
// Styles
const scss = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')
// JavaScript
const concat = require('gulp-concat');
const terser = require('gulp-terser');
// Other
const replace = require('gulp-replace');
const header = require('gulp-header');
const browsersync = require('browser-sync').create();

// Establish file paths
const paths = {
    css: {
        src: './src/scss/**/*.scss',
        dest: './assets/css',
        destView: './_view'
    },
    js: {
        src: './src/js/**/*.js',
        dest: './assets/js'
    },
    html: {
        src: './*.html',
        serve: './'
    }
};

// Header constants
const pkg = require('./package.json');
const banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

// Complies & minifies CSS
function scssTask() {
    return src(paths.css.src, { sourcemaps: true })
        .pipe(scss())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(dest(paths.css.dest, { sourcemaps: '.' }));
}

// Complies CSS into uncompressed css file
// Used for easy viewing during development.
function scssViewtask() {
    return src(paths.css.src, { sourcemaps: false })
        .pipe(scss())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(dest(paths.css.destView));
}

// Cooncatenates and uglifies JavsScript files
function jsTask() {
    return src(paths.js.src, { sourcemaps: true })
        .pipe(concat('scripts.js'))
        .pipe(terser())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(dest(paths.js.dest, { sourcemaps: '.' }));
}

// BrowserSync to create local server
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: paths.html.serve,
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}

// Reloads BrowserSync upon change to JS or SCSS files
function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watches CSS, JS, and HTML files for changes and rebuilds on file save
function watchTask() {
    watch(
        [paths.css.src, paths.js.src, paths.html.src],
        series(
            parallel(scssTask, scssViewtask, jsTask),
            browserSyncReload
        )
    );
}

// Watchs CSS, JS, and HTML files for changes and rebuilds on file save
// This task does NOT init or reload BrowserSync
function watchNoBsTask() {
    watch(
        [paths.css.src, paths.js.src, paths.html.src],
        series(
            parallel(scssTask, scssViewtask, jsTask)
        )
    );
}

// Default Gulp task
// 1st, runs scssTask, scssViewTask, and jsTask simultaneously
// 2nd, spins up a BrowserSync server
// 3rd, runs the watchTask
exports.default = series(
    parallel(scssTask, scssViewtask, jsTask),
    browserSyncServe,
    watchTask
);

// Build & Watch Only
// This task does not initialize or reload a BrowserSync server
exports.nobs = series(
    parallel(scssTask, scssViewtask, jsTask),
    watchNoBsTask
);