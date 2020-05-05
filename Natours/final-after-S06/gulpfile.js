
//https://css-tricks.com/gulp-for-beginners/



var gulp = require('gulp');
var del = require('del');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');

//var runSequence = require('run-sequence');

var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var csso = require('gulp-csso');


var paths = {
    scssFiles: ['sass/**/*.scss', 'sass/**/*.sass'],
    cssFiles:['dist/**/*.css']
};


  //https://www.npmjs.com/package/run-sequence

  // gulp.task('build-prod', function(callback) {
  //   return runSequence('clean', 'sass', 'mincss', callback);
  // });




  // gulp.task('build-prod', function(callback) {
  //   return runSequence('clean', 'sass', 'mincss', callback);
  // });
  // gulp.task('default', ['clean'], function () {
  //   runSequence(
  //     'sass',
  //     'mincss'
  //   );
  // });

//gulp.watch('files-to-watch', gulp.series(['tasks', 'to', 'run']));

gulp.task('watch', function(){
  return gulp.watch('sass/**/*.scss', gulp.series(['sass']));//, 'to', 'run']));
});




//gulp.task('prod', gulp.series(['clean', 'sass', 'mincss']))
//https://codeburst.io/switching-to-gulp-4-0-271ae63530c0

//NOT WORKING with Gulp >=4.*
gulp.task('prod', function(){
  return gulp.series(['clean', 'sass', 'mincss']);
});




const compileStyle = () => { // COMPILE STYLE 
  return gulp.src(paths.scssFiles, { allowEmpty: true })
  .pipe(sass()) // Using gulp-sass
  .pipe(concat('style.css'))
  .pipe(gulp.dest('css/'))
}


const clean = () => { // COMPILE STYLE 
    var options = {
      force: true
  };
  return del(['dist/**/*','prod/**/*'], options );
}

const minCss = () => { // COMPILE STYLE 
  return gulp.src(paths.cssFiles, { allowEmpty: true })
      .pipe(csso()) // Min CSS file
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('css/'))
}



function defaultTask(cb) {
  // place code for your default task here
  gulp.series([clean, compileStyle, minCss]);
  cb();
}


//WORKING!!!!
const prodTask = gulp.series(clean, compileStyle, minCss);


exports.clean = clean;
exports.compileStyle = compileStyle;
exports.minCss = minCss;
exports.default = defaultTask;
exports.prodTask = prodTask;



gulp.task('sass', function(){
    return gulp.src(paths.scssFiles, { allowEmpty: true })
      .pipe(sass()) // Using gulp-sass
      .pipe(concat('style.css'))
      .pipe(gulp.dest('css/'))
  });

  gulp.task('mincssnano', function(){
    return gulp.src(paths.cssFiles, { allowEmpty: true })
      .pipe(cssnano()) // Min CSS file
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('css/'))
  });

  gulp.task('mincss', function(){
    return gulp.src(paths.cssFiles, { allowEmpty: true })
      .pipe(csso()) // Min CSS file
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('css/'))
  });

  
  gulp.task('clean', function () {
    var options = {
        force: true
    };
    return del(['dist/**/*','prod/**/*'], options );
  });

  gulp.task('clean-prod', function () {
    var options = {
        force: true
    };
    return del(['prod/**/*'], options );
  });




  gulp.task('callback-example', function(callback) {
    // Use the callback in the async function
    console.log("building files");
    callback();
    //     fs.readFile('...', function(err, file) {
    //         console.log(file);
    //         callback();
    // //      ^^^^^^^^^^
    // //       This is what lets gulp know this task is complete!
    //     });
});