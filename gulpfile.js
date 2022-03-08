// gulp base
const { src, dest, series, watch } = require('gulp');

// css
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// js
const rollup = require('gulp-rollup-lightweight');
const source = require('vinyl-source-stream');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs')
const rollupBabel = require('@rollup/plugin-babel');
const uglify = require('rollup-plugin-uglify');

// misc
const rename = require('gulp-rename');



// css: dev
function cssDev() {
  return src("src/assets/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      'outputStyle': 'compressed',
      'precision': 8,
      'includePaths': ['./node_modules']
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest("src/assets/compiled/"))

}

// css: build
function cssProd() {
    return src("src/assets/scss/*.scss")
    .pipe(sass({
      'outputStyle': 'compressed',
      'precision': 8,
      'includePaths': ['./node_modules']
    }).on('error', sass.logError))
    .pipe(autoprefixer({ grid: 'no-autoplace' }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest("src/assets/compiled/"))
}



// js: dev
function jsDev() {
  return rollup({
    input: './src/assets/js/app.js',
    output: {
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      rollupBabel.babel({ babelHelpers: 'bundled' }),
    ]
  })
  .pipe(source('app.min.js'))
  .pipe(dest('src/assets/compiled/'))
}

// js: build
function jsProd() {
  return rollup({
    input: './src/assets/js/app.js',
    output: {
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      rollupBabel.babel({ babelHelpers: 'bundled' }),
      uglify.uglify()
    ]
  })
  .pipe(source('app.min.js'))
  .pipe(dest('src/assets/compiled/'))
}



/*
    Watch files
*/
function watchFiles(done) {
    watch("src/assets/scss/**/*.scss", cssDev);
    watch("src/assets/js/**/*.js", jsDev);
}



/*
    Compose tasks
*/
const watchTask = series(cssDev, jsDev, watchFiles);
const buildTask = series(cssProd, jsProd);



/*
    Exports public tasks
*/
exports.cssDev = cssDev;
exports.cssProd = cssProd;
exports.jsDev = jsDev;
exports.jsProd = jsProd;
exports.build = buildTask;
exports.watch = watchTask;
exports.default = watchTask;