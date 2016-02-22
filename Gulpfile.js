var gulp = require('gulp');

// General Gulp Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var replace = require('gulp-replace');
var sass = require('gulp-sass');

// BrowserSync
var browserSync = require('browser-sync').create();

// Post CSS & Plugins
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var comments = require('postcss-discard-comments');

// Post CSS Processors
var processors = [
    comments({removeAll: true}),
    autoprefixer({browsers: ['last 3 version']}),
    cssnano()
];


// SCSS workflow.
gulp.task('sass', function() {
    gulp.src('resources/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(rename({
            basename : 'main',
            extname : '.css'
        }))
        .pipe(gulp.dest('resources/css'))
        .pipe(browserSync.stream());
});

// JS vendor scripts
gulp.task('js-vendor', function() {
    gulp.src('resources/js/vendor/*.js')
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('resources/js'));
});

// JS general working files
gulp.task('js', function() {
    gulp.src(['resources/js/*.js', '!resources/js/*.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('resources/js'));
});


// Compress images (This will overwirte the images with the compressed ones)
// Can't not be put on watch because it will go into infinite loop.
gulp.task('img', function() {
    gulp.src('resources/images/**/*.*')
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('resources/images'));
});


// Watch & Run
gulp.task('default', function() {

    browserSync.init({
        server : {
            baseDir : "./"
        },
        browser : 'google chrome'
    });

    gulp.watch('resources/sass/**/*.scss', ['sass']);
    gulp.watch('resources/js/vendor/*.js', ['js-vendor']).on('change', browserSync.reload);
    gulp.watch('resources/js/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);

});
