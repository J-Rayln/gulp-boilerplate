// initialize modules
const { src, dest, watch, parallel, series } = require("gulp");

const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const del = require("del");
const header = require("gulp-header");
const gulpif = require("gulp-if");
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const args = require("yargs").argv;

// set environment variable
const env = args.env ? process.env.NODE_ENV : "development";

// file path variables
const files = {
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/css",
  },
  js: {
    src: "src/js/**/*.js",
    dest: "dist/js",
  },
  img: {
    src: "src/img/**/*",
    dest: "dist/img",
  },
  html: {
    serve: "./",
  },
};

// banner/header constants
const pkg = require("./package.json");
const banner = [
  "/*",
  " <%= pkg.name %> - <%= pkg.description %>",
  " @version v<%= pkg.version %>",
  " @license <%= pkg.license %>",
  " */",
  "",
].join("\n");

// sass task
function scssTask() {
  return (
    src(files.styles.src)
      // only build sourcemaps during development
      .pipe(gulpif(args.env != "production", sourcemaps.init()))
      .pipe(sass())
      // purge an unused CSS classes during production build
      .pipe(
        gulpif(args.env === "production", purgecss({ content: ["*.html"] }))
      )
      // only autoprefix and minify in production
      .pipe(
        gulpif(args.env === "production", postcss([autoprefixer(), cssnano()]))
      )
      // write suffix to *.min.css during production
      // .pipe(gulpif(args.env === "production", rename({ suffix: ".min" })))
      // only build sourcemaps during development
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulpif(args.env != "production", sourcemaps.write(".")))
      .pipe(dest(files.styles.dest))
  );
}

// javascript task
function jsTask() {
  return src(files.js.src)
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(dest(files.js.dest));
}

// cachebusting task
const cbString = new Date().getTime();
function cacheBustingTask() {
  return src(["index.html"])
    .pipe(replace(/v=\d+/g, "v=" + cbString))
    .pipe(dest("."));
}

// BrowserSync to create local server
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: files.html.serve,
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}

// Reloads BrowserSync upon change to JS or SCSS files
function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// watch task
function watchTask() {
  watch(
    [files.styles.src, files.js.src],
    series(
      cleanTask,
      parallel(scssTask, jsTask),
      cacheBustingTask,
      browserSyncReload
    )
  );
}

// clean task
function cleanTask() {
  return del("./dist");
}

// default task
exports.default = series(
  cleanTask,
  parallel(scssTask, jsTask),
  cacheBustingTask,
  browserSyncServe,
  watchTask
);

exports.devNoBs = series(
  cleanTask,
  parallel(scssTask, jsTask),
  cacheBustingTask,
  watchTask
);

exports.build = series(cleanTask, parallel(scssTask, jsTask), cacheBustingTask);

exports.clean = cleanTask;
