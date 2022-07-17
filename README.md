# Basic Gulp/Sass Boilerplate

This is a basic boilerplate that uses Sass and a Gulp 4 workflow. Most files are commented fairly well with what they do. Check them out for more information.

## To Get Started

1. If you haven't already, make sure you have [Node.js](https://nodejs.org/en/) installed.
2. In your terminal, run `npm install`
3. In your terminal, run `npm start`

See addiional commands below.

## NPM Commands Included

| Command | Description |
| ---- | --- |
| `npm start` | Runs the gulp default task |
| `npm nobs` | Runs the default gulp task, but without the Browser-Sync server |
| `npm dev` | Runs the Sass compiler ONLY via Node.  Does not autoprefix.  Does not minify.  Does not concatinate JavaScript. I find this usefull while I'm building out hte initial structure of my Sass. |

## Gulp Tasks

| Command | Description |
| ---- | --- |
| `default` | <ul><li>Compiles, autoprefixes, and minifies Sass files.</li><li>Compiles an expanded version of Sass files into the `_view` directory.  Easy to reference during development.</li><li>Concatinates, uglifies, and minifies JavaScript</li><li>Spins up a Browser-Sync server and refreshes on save of HTML, JavaScript or Sass files.</li><li>Adds a header to compiled CSS and JS files with project info</li></ul>|
| `nobs` | Does all the above EXCEPT run Browser-Sync |


## Changelog

---
### Version 2.1.0
- Built out SCSS folder structure
- Added script functionality to `package.json` to clean up project folder when complete by deleting `node_modules` and `_view`.
  - *Important: make sure to uninstall dependencies by running `npm uninstall -D <package-name>` for **each** package before running `npm cleanProject`.
- Added helper classes
- Minor code improvements

---
### Version 2.0.0

- Refactored basic structure to
  - Transition from using `@import` to `@forward` and `@use`. See [this link](https://sass-lang.com/documentation/at-rules/import).
  - Removed conditionals that tested if min and max font size were the same from the `fluid-font()` function. Moved this functionality to the `_root.scss` partial.
  - Moved `mixins` and `functions` into partials based on category.
  - Renamed `abstracts` to `utilities` and recategorized functions and mixins.
  - Modified `to-rem()` function to base conversion on new `$base-font-size` variable that sets base font (usually 16px) for the project.
- Added `strip-unit()` function to make numbers unitless.

---
### Version 1.2.0

- Minor tweaks to documentation
- Added header via gulp-header to compiled CSS and JS files.
- Added Browser-Sync functionality

### Version 1.0.0 - Initial Release
