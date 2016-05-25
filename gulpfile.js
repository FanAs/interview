/* eslint-env node */

'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var eslint = require('gulp-eslint');
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var makeWebpackConfig = require('./webpack/makeconfig');
var webpackBuild = require('./webpack/build');
var webpackDevServer = require('./webpack/devserver');

gulp.task('env', function() {
  process.env.NODE_ENV = 'development';
  require('fs').writeFileSync('.devel', 'true');
});

gulp.task('envDeploy', function() {
  process.env.NODE_ENV = 'production';
  require('fs').unlink('.devel', function(err) {
    if (err) {process.env.NODE_ENV = 'production'; }
  });
});

gulp.task('build-webpack-production', webpackBuild(makeWebpackConfig(false)));
gulp.task('build-webpack-dev', webpackDevServer(makeWebpackConfig(true)));

gulp.task('eslint', function() {
  var ESLINT_REPORT = 'testbuilder/reports/eslint';
  fse.mkdirsSync(ESLINT_REPORT);
  return gulp.src(['public/js/**/*.js', 'gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format('jslint-xml', fs.createWriteStream(path.resolve(ESLINT_REPORT, 'report.xml'))))
    .pipe(eslint.failOnError());
});

gulp.task('deploy', [/*'eslint'*/, 'envDeploy', 'build-webpack-production']);
gulp.task('default', ['env', 'build-webpack-dev']);
