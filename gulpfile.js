'use strict';

var browserify = require('browserify')
  , source = require('vinyl-source-stream')
  , gulp = require('gulp')
  , less = require('gulp-less')
  , watchify = require('watchify')

gulp.task('bundleJs', function () {
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

gulp.task('bundleCss', function () {
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

gulp.task('default', ['bundleJs', 'bundleCss']);
