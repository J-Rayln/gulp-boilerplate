# Basic Gulp/Sass Boilerplate

This is a basic boilerplate that uses Sass and a Gulp 4 workflow. Most files are commented fairly well with what they do. Check them out for more information.

- [Getting Started](#to-get-started)
- [Gulp Tasks](#gulp-tasks)
  - [start](#npm-start-orbr-npm-run-dev)
  - [dev](#npm-start-orbr-npm-run-dev)
  - [devNoBs](#npm-run-devnobs)
  - [build](#npm-run-build)
- [Changelog](#changelog)

## To Get Started

1. If you haven't already, make sure you have [Node.js](https://nodejs.org/en/) installed.
2. In your terminal, run `npm install`.
3. In your terminal, run one of the commands below.

## Gulp Tasks

The table below outlines which Gulp tasks each Node command runs.


### `npm start` *or*<br> `npm run dev`
Both commands do the same thing, it's really just a matter of preference.  They run the default Gulp task without the `--env production` flag.  In this mode, CSS files aren't minified and sourcemaps are produced.  

| tasks they run | what they do |
| --- | --- |
| `cleanTask`| Deletes the `dist` directory so that newly compiled files are the most current |
| `scssTask` | - Compiles SCSS files and outputs CSS to `./dist/css` folder.<br>- Creates sourcemaps for debuging in the `./dist/css` directory.<br>- Adds the header banner to the top of the compiled CSS file. |
| `jstask` | - Concatinates all `*.js` files in the `./src/js` directory.<br>- Uglifies and minimizes compiled JS file.<br>- Adds `.min` suffix to compiled file.<br>- Adds header banner to file.<br>- Outputs compiled JS to `./dist/js` folder. |
| `cacheBustingTask` | - Appends a unique query string to the end of the CSS and JavaScript file links in the `*.html` files to force browsers to fetch the latest version of all the asset files. |
| `browserSyncServe` | - Spins up a local server that automatically refreshes browser each time you save a file. |
| `watchTask` | - Watches for changes to files in the `./src/scss` and `./src/js` directories then recompiles all files and refreshes the browser on save. |

### `npm run devNoBs`

This runs the same tasks as `npm start` or `npm dev` [(see above)](#npm-start-orbr-npm-run-dev) but WITHOUT running a Browser-Sync server.

### `npm run build`
This command runs the build tasks WITH the `--env production` flag.  With this flag, the following tasks are affected:

| tasks they run | what they do |
| --- | --- |
| `scssTask` | - Sourcemaps are NOT created<br>- Compiled CSS files are autoprefixed and minified.<br>- Unused classes are stripped from the final CSS output.  This is especially helpful for any extra utility classes that are created during development but never actually used. |
| `cleanTask`<br>`cacheBustingTask`| - These tasks run the same as they do during development. |
| `browserSyncServe`<br>`watchTask` | - Since this is a build only command, these tasks are not run. |

---
## Changelog

#### Version 2.1.2
- Bug fix #8: Browser-Synch not reloading after save to HTML files
- Added `./src/scss/components` folder to `main.scss` forwards.

#### Version 2.1.1
- Updated Gulp tasks (see above notes for functionality)
- Updated Node scripts

---
#### Version 2.1.0
- Built out SCSS folder structure
- Added script functionality to `package.json` to clean up project folder when complete by deleting `node_modules` and `_view`.
  - *Important: make sure to uninstall dependencies by running `npm uninstall -D <package-name>` for **each** package before running `npm cleanProject`.*
- Added helper classes
- Minor code improvements

---
#### Version 2.0.0

- Refactored basic structure to
  - Transition from using `@import` to `@forward` and `@use`. See [this link](https://sass-lang.com/documentation/at-rules/import).
  - Removed conditionals that tested if min and max font size were the same from the `fluid-font()` function. Moved this functionality to the `_root.scss` partial.
  - Moved `mixins` and `functions` into partials based on category.
  - Renamed `abstracts` to `utilities` and recategorized functions and mixins.
  - Modified `to-rem()` function to base conversion on new `$base-font-size` variable that sets base font (usually 16px) for the project.
- Added `strip-unit()` function to make numbers unitless.

---
#### Version 1.2.0

- Minor tweaks to documentation
- Added header via gulp-header to compiled CSS and JS files.
- Added Browser-Sync functionality

---
#### Version 1.0.0 - Initial Release
