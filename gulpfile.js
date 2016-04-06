var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var path = require('path');
var uglify = require('gulp-uglifyjs');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var sourcemaps = require('gulp-sourcemaps');
 
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: '8080'
  });

  gulp.watch('./less/**/*.less', ['less']);
  gulp.watch("./index.html").on('change', browserSync.reload);
})



gulp.task('uglify', function() {
  gulp.src('js/*.js')
    .pipe(uglify('app.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('assets/js'))
});

gulp.task('less', function () {
  return gulp.src('./less/**/styles.less')
  	.pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
      plugins: [cleancss]
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browserSync.reload({stream:true}))
});
 

gulp.task('default', ['less', 'uglify' , 'browserSync']);