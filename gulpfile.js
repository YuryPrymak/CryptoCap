import gulp from 'gulp';
import glob from 'glob';
import htmlmin from 'gulp-htmlmin';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import webpackStream from 'webpack-stream';
import eslint from 'gulp-eslint';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import del from 'del';
import gulpif from 'gulp-if';

// Setup
const sass = gulpSass(dartSass);
browserSync.create();

// Watch Options
const watchOptions = {
  usePolling: true
};

// Build Settings
const minimizeHTML = true;
const minimizeCSS = true;
const minimizeJS = true;
const minimizeIMG = false;

// Webpack Config
const webpackConfig = mode => {
  return {
    mode,
    devtool: mode === 'development' ? 'eval-cheap-source-map' : false,
    entry: glob.sync('./src/assets/js/*.js').reduce((entries, path) => {
      const entry = path.replace('./src/assets/js/', '');
      entries[entry] = path;
      return entries;
    }, {}),
    output: {
      filename: '[name]'
    },
    optimization: {
      minimize: mode === 'development' ? false : minimizeJS
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3.8
                    }
                  }
                ]
              ]
            }
          }
        }
      ]
    }
  }
};

// HTML
export const htmlDev = () => gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());

export const htmlBuild = () => gulp.src('src/*.html')
  .pipe(gulpif(minimizeHTML, htmlmin({ collapseWhitespace: true })))
  .pipe(gulp.dest('dist'));

// SCSS
export const scssDev = () => gulp.src('src/assets/scss/*.scss')
  .pipe(sass())
  .pipe(postcss([ autoprefixer() ]))
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(browserSync.stream());

export const scssBuild = () => gulp.src('src/assets/scss/*.scss')
  .pipe(sass())
  .pipe(postcss([ autoprefixer() ]))
  .pipe(gulpif(minimizeCSS, csso()))
  .pipe(gulp.dest('dist/assets/css'));

// JavaScript
export const jsDev = () => gulp.src('src/assets/js/*.js')
  .pipe(webpackStream(webpackConfig('development'), null, browserSync.reload()))
  .pipe(gulp.dest('dist/assets/js'));

export const jsBuild = () => gulp.src('src/assets/js/*.js')
  .pipe(webpackStream(webpackConfig('production')))
  .pipe(gulp.dest('dist/assets/js'));

export const jsLint = () => gulp.src('./src/assets/js/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());

// Images
export const imgDev = () => gulp.src('src/assets/img/**/*')
  .pipe(gulp.dest('dist/assets/img'));

export const imgBuild = () => gulp.src('src/assets/img/**/*')
  .pipe(gulpif(minimizeIMG, imagemin()))
  .pipe(gulp.dest('dist/assets/img'));

// Server
export const server = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    port: 3000,
    ui: false,
    notify: false
  });
};

// Watch
export const watch = () => {
  gulp.watch('src/*.html', watchOptions, gulp.parallel(htmlDev));
  gulp.watch('src/assets/scss/**/*.scss', watchOptions, gulp.parallel(scssDev));
  gulp.watch('src/assets/js/**/*.js', watchOptions, gulp.parallel(jsDev, jsLint));
  gulp.watch('src/assets/img/**/*', watchOptions, gulp.parallel(imgDev, htmlDev, scssDev));
  gulp.watch('src/assets/fonts/**/*', watchOptions, gulp.parallel(copyFonts));
  gulp.watch('src/assets/libs/**/*', watchOptions, gulp.parallel(copyLibs));
  gulp.watch('src/static/**/*', watchOptions, gulp.parallel(copyStatic));
};

// Copy
export const copyStatic = () => gulp.src('src/static/**/*')
  .pipe(gulp.dest('dist'));

export const copyFonts = () => gulp.src('src/assets/fonts/**/*')
  .pipe(gulp.dest('dist/assets/fonts'));

export const copyLibs = () => gulp.src('src/assets/libs/**/*')
  .pipe(gulp.dest('dist/assets/libs'));

// Clean dist
export const cleanDist = () => del('dist/**/*');

// Serve (Default)
export default gulp.series(
  cleanDist,
  gulp.parallel(htmlDev, scssDev, jsDev, imgDev, copyStatic, copyFonts, copyLibs),
  gulp.parallel(watch, server)
);

// Build
export const build = gulp.series(
  cleanDist,
  gulp.parallel(htmlBuild, scssBuild, jsBuild, imgBuild, copyStatic, copyFonts, copyLibs)
);
