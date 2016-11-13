/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
  serverJs: 'server/**/*.js',
  clientEntryPoint: 'src/javascripts/app.js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  clientBundle: 'dist/client-bundle.js?(.map)',
  libDir: 'lib',
  distDir: 'public/js',
};

// Clean task
// -----------
// Deletes the auto generated lib folder
//
gulp.task('clean', () => {
  return del([paths.libDir, paths.distDir]);
});

// Build task
// -----------
// First runs clean, then babel compiles code
//
gulp.task('build', ['lint', 'clean'], () => {
  return gulp.src(paths.serverJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir));
});


// Lint task
// -----------
// First runs build, then runs `node lib`
//
gulp.task('lint', () => {
  return gulp.src([
    paths.serverJs,
    paths.gulpFile,
    paths.webpackFile,
  ]).pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

// Main task
// -----------
// First runs build, then runs `node lib`
//
gulp.task('main', ['lint', 'clean'], () => {
  return gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir));
});


// Watch task
// -----------
// Watches for code changes and then runs main task
//
gulp.task('watch', () => {
  gulp.watch(paths.serverJs, ['main']);
});


// Default task
// -----------
// Starts the watch, and then runs main to get things started
//
gulp.task('default', ['watch', 'main']);
