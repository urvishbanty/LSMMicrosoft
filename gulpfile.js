/// <reference path="bower_components/angular-ui-grid/ng-grid-flexible-height.js" />
/// <reference path="bower_components/angular-ui-grid/ng-grid-flexible-height.js" />
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')();


function getArg(key) {
    var index = process.argv.indexOf(key);
    var next = process.argv[index + 1];
    return (index < 0) ? null : (!next || next[0] === "-") ? true : next;
}

var tasksList = getArg("--env");
console.log('tasksList')
console.log(tasksList)

var tasksArray;

// to run all tasks run gulp
// to run specific tasks run gulp --env 'html','scripts' etc.
if (!tasksList || tasksList == 'all') {
    tasksArray = ['styles', 'fonts', 'images', 'html', 'scripts', 'vendors'];
} else {
    tasksArray = tasksList.split(',');
}

// valid values are 'styles', 'fonts','images', 'html', 'scripts','vendors','mapFiles'
console.log('running the following tasks');
console.log(tasksArray);







gulp.task('deleteCssFolder', require('del').bind(null, ['client/assets/styles']));


gulp.task('deleteFontsFolder', require('del').bind(null, ['client/assets/fonts']));


gulp.task('deleteImagesFolder', require('del').bind(null, ['client/assets/images']));

gulp.task('deleteHtmlFolder', require('del').bind(null, ['client/views/partials']));

gulp.task('deleteScriptsFile', require('del').bind(null, ['client/assets/scripts/scripts.js']));

gulp.task('deleteVendorsFile', require('del').bind(null, ['client/assets/vendors.js']));

gulp.task('scripts', ['deleteScriptsFile'], function () {
    var filesToConcat = ['lglsystem.module.js', 'lglsystem.config.js', 'lglsystem.constants.js', 'controllers/*.js',  'filters/*.js', 'services/*.js']
    gulp.src(filesToConcat)
.pipe(concat('lglsystem.min.js'))
.pipe(uglify().on('error', gutil.log))
.pipe(gulp.dest('client/assets/scripts'));
});


gulp.task('vendors', ['deleteVendorsFile'], function () {
    var filesToConcat = [
"bower_components/jquery/dist/jquery.min.js",
"bower_components/angular-bootstrap/bootstrap.min.js",
"bower_components/angular/angular.min.js",
"bower_components/angular-route/angular-route.js",
"bower_components/angular-bootstrap/ui-bootstrap.min.js",
"bower_components/angular-bootstrap/ui-bootstrap-tpls-0.13.4.min.js",
"bower_components/angular-cookies/angular-cookies.min.js",
"bower_components/angular-resource/angular-resource.min.js",
"bower_components/angular-sanitize/angular-sanitize.min.js",
"bower_components/angular-touch/angular-touch.min.js",
"bower_components/lodash/lodash.min.js",
//"bower_components/angular-material/angular-material.js",
"bower_components/angular-aria/angular-aria.js",
"bower_components/angular-animate/angular-animate.js",
"bower_components/angular-ui-grid/ui-grid.js",
"bower_components/angular-ui-grid/ng-grid-flexible-height.js",
"addjs/datajs-1.1.2.js",
"bower_components/spin.js/spin.js",
"bower_components/angular-spinner/angular-spinner.min.js",
"addjs/angular-loading-spinner.js",
"bower_components/js-xlsx/xlsx.js",
"bower_components/js-xlsx/jszip.js",
"bower_components/js-xlsx/xlsx.js",
"bower_components/js-xlsx/dist/xlsx.core.min.js",
"bower_components/js-xlsx/FileSaver.js",
"bower_components/js-xlsx/Blob.js",
    ];
    return gulp.src(filesToConcat)
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest('client/assets/scripts'))
        .pipe($.rename('vendor.min.js'))
        .pipe(gulp.dest('client/assets/scripts'))
        .on('error', $.util.log);
});

gulp.task('html', ['deleteHtmlFolder'], function () {
    return gulp.src('views/partials/*.html')
        .pipe($.if('*.html', $.minifyHtml({ conditionals: true, loose: true, empty: true })))
        .pipe(gulp.dest('client/views/partials'));
});



gulp.task('styles', ['deleteCssFolder'], function () {
    //var filesToContact = [
    //    'assets/css/bootstrap.min.css',
    //            'assets/css/AdminLTE.min.css',
    //    'assets/css/MS-styles.css',
    //    'assets/css/font-awesome.css',
    //    'bower_components/angular-ui-grid/ui-grid.min.css',
    //     'assets/css/styles.css',
    //       'assets/css/_all-skins.min.css',
    //    //'bower_components/angular-material/angular-material.css',

    //];

    ////var cssChannel = lazypipe()
    ////   .pipe($.csso)
    ////   .pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap', 'dist/fonts/bootstrap')
    ////   .pipe($.replace, '../images/', '../images/')
    ////   .pipe($.replace, '../assets/temp/', '../images/')
    ////   .pipe($.replace, '../assets/images/', '../images/');

    //return gulp.src(filesToContact)
    //    .pipe($.concat('main.css'))
    //   // .pipe(cssChannel())
    //    .pipe($.autoprefixer({ browsers: ['last 1 version'] }))
    //    .pipe(gulp.dest('client/assets/styles'))
    //    .on('error', $.util.log);
});

gulp.task('fonts', ['deleteFontsFolder'], function () {
    return gulp.src('assets/fonts/**/*')
        .pipe(gulp.dest('client/assets/fonts'));
});

gulp.task('images', ['deleteImagesFolder'], function () {
    return gulp.src('assets/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('client/assets/images'));
});


gulp.task('default', tasksArray, function () {
    return console.log(' done building');
});
