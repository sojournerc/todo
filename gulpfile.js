'use strict';

var browserify = require('browserify')
  , source = require('vinyl-source-stream')
  , gulp = require('gulp')
  , less = require('gulp-less')
  , watchify = require('watchify')
  , uglify = require('gulp-uglify')
  , uglifyCss = require('gulp-uglifycss')
  , rename = require('gulp-rename')

gulp.task('bundleJsDev', function () {
  function bundle(){
    console.log('bundling javascript')
    var bundling = bundler.bundle()
    return bundling
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js'));
  }
  var bundler = watchify(browserify('./source/client/main.js',{
    debug:true, 
    cache: {}, 
    packageCache: {}, 
    fullPaths: true,
  }));
  bundler.on('update', bundle);
  return bundle()
});

gulp.task('bundleCssDev', function () {
  function bundle(){
    console.log('bundling css')
    return gulp.src('./source/client/less/main.less')
    .pipe(less({sourceMap:true}))
    .on('error', function(e){ console.log(e.message + '\n' + e.stack); process.exit(1); })
    .pipe(gulp.dest('./public/css'));
  }
  gulp.watch('./source/**/*.less', bundle);
  return bundle();
});

gulp.task('minifyJs', function () {
  return gulp.src('./public/js/main.js')
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('minifyCss', function () {
  return gulp.src('./public/css/main.css')
    .pipe(uglifyCss())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest('./public/css'));
});



gulp.task('default', ['bundleJsDev', 'bundleCssDev']);





