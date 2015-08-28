var gulp        = require('gulp'),
    del         = require('del'),
    cache       = require('gulp-cached'),
    concat      = require('gulp-concat'),
    filter      = require('gulp-filter'),
    mincss      = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    rigger      = require('gulp-rigger'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    gutil       = require('gulp-util'),
    spritesmith = require('gulp.spritesmith'),
    jade        = require('gulp-jade');


var paths = {

  // пути, по которым будут находиться собранные файлы
  build: {
    templates   : 'dist/',
    style  : 'dist/css/',
    js     : 'dist/js/',
    img    : 'dist/images/',
    sprite : {
      img  : 'src/images/',
      css  : 'src/scss/core/'
    },
    fonts  : 'dist/fonts/'
  },

  // пути, по которым находятся исходники
  src: {
    templates   : ['src/jade/*.jade'],
    style  : ['src/scss/main.scss', 'src/scss/ie.scss'],
    js     : ['src/js/libs.js', 'src/js/vendor.js', 'src/js/main.js', 'src/js/polyfills/*.*'],
    img    : ['src/images/**/*.*', '!src/images/sprite/*.*'],
    sprite : 'src/images/sprite/*.*',
    fonts  : 'src/fonts/**/*.*'
  },

  // пути к файлам, за изменениями которых будем следить
  watch: {
    templates   : 'src/jade/**/*.jade',
    style  : 'src/scss/**/*.scss',
    js     : 'src/js/**/*.js',
    img    : ['src/images/**/*.*', '!src/images/sprite/*.*'],
    sprite : 'src/images/sprite/*.*',
    fonts  : 'src/fonts/**/*.*'
  },

  clean: './dist'

};


gulp.task('templates', function() {
  return gulp.src(paths.src.templates)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.build.templates))
});


gulp.task('styles', function() {
  return gulp.src(paths.src.style)
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.dest(paths.build.style))

    .pipe(gutil.env.production === true ? mincss({ keepBreaks: true }) : gutil.noop())
    .pipe(gutil.env.production === true ? rename({ suffix: '.min' }) : gutil.noop())
    .pipe(gutil.env.production === true ? gulp.dest(paths.build.style) : gutil.noop());
});


gulp.task('js', function() {
  return gulp.src(paths.src.js)
    .pipe(rigger())
    .pipe(gulp.dest(paths.build.js))

    .pipe(gutil.env.production === true ? uglify() : gutil.noop())
    .pipe(gutil.env.production === true ? rename({ suffix: '.min' }) : gutil.noop())
    .pipe(gutil.env.production === true ? gulp.dest(paths.build.js) : gutil.noop());
});


gulp.task('img', ['sprite'], function() {
  return gulp.src(paths.src.img)
    //.pipe(cache('imgmin'))
    .pipe(gulp.dest(paths.build.img));
});


gulp.task('sprite', function() {
  var spriteData = 
    gulp.src(paths.src.sprite)
      .pipe(spritesmith({
        algorithm: 'top-down',
        algorithmOpts: { sort: false },
        padding: 3,
        cssFormat: 'scss_maps',
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        cssTemplate: 'sprite.scss.mustache'
      }));

  spriteData.img.pipe(gulp.dest(paths.build.sprite.img));
  spriteData.css.pipe(gulp.dest(paths.build.sprite.css));
});


gulp.task('fonts', function () {
  gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.build.fonts));
});


gulp.task('clean', function () {
  del(paths.clean);
});


gulp.task('watch', function() {
  gulp.watch([paths.watch.templates], ['templates']);
  gulp.watch([paths.watch.style], ['styles']);
  gulp.watch([paths.watch.js], ['js']);
  gulp.watch([paths.watch.img], ['img']);
  gulp.watch([paths.watch.sprite], ['sprite']);
  gulp.watch([paths.watch.fonts], ['fonts']);
});


gulp.task('build', [
  'templates',
  'styles',
  'js',
  'img',
  'fonts'
]);


gulp.task('default', ['watch']);