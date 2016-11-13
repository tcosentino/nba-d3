const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const exec = require('child_process').exec;

const paths = {
  jsSrc: 'server/**/*.js',
  libDir: 'lib',
};

// Clean task
// -----------
// Deletes the auto generated lib folder
// 
gulp.task('clean', () => {
  return del(paths.libDir);
});

// Build task
// -----------
// First runs clean, then babel compiles code
// 
gulp.task('build', ['clean'], () => {
  return gulp.src(paths.jsSrc)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir));
});


// Main task
// -----------
// First runs build, then runs `node lib`
// 
gulp.task('main', ['build'], (callback) => {
  exec(`node ${paths.libDir}`, (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});


// Watch task
// -----------
// Watches for code changes and then runs main task
// 
gulp.task('watch', () => {
  gulp.watch(paths.jsSrc, ['main']);
});


// Default task
// -----------
// Starts the watch, and then runs main to get things started
// 
gulp.task('default', ['watch', 'main']);