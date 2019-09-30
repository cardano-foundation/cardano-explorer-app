# `styles` directory

## `global` directory

Global CSS styles and fonts, loaded via `Layout.scss`


## `mixins` directory

CSS Mixins


## `resources` directory

Global SCSS variables, loaded via [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) in `next.config.js`

  * Do not include anything that will be actually rendered in CSS, because it will be added to every imported SASS file.
  * Avoid using SASS `@import` rules inside resources files as it slows down incremental builds. Add imported files directly in `sassResources` array in webpack config instead. If you concerned about location of your resources index, you might want to check out the solution outlined in [this comment](https://github.com/shakacode/sass-resources-loader/issues/46#issuecomment-335211284).
  * If you still want to use SASS `@imports` make sure your paths are relative to the file they defined in (basically, your file with resources), except the ones started with `~` (`~` is resolved to `node_modules` folder).


## `theme` directory

React-polymorph files
