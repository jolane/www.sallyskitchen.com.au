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

// SVG
svgmin = require('gulp-svgmin');
svgstore = require('gulp-svgstore');
svg2png = require('gulp-svg2png');
rsp = require('remove-svg-properties').stream;


// Post CSS Processors
var processors = [
    comments({removeAll: true}),
    autoprefixer({browsers: ['last 3 version']}),
    cssnano()
];


// SCSS workflow.
gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(rename({
            basename : 'main',
            extname : '.css'
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// JS vendor scripts
gulp.task('js-vendor', function() {
    gulp.src('js/vendor/*.js')
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

// JS general working files
gulp.task('js', function() {
    gulp.src(['js/*.js', '!js/*.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js'));
});


// Compress images (This will overwirte the images with the compressed ones)
// Can't not be put on watch because it will go into infinite loop.
gulp.task('img', function() {
    gulp.src('images/**/*.*')
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('images'));
});

gulp.task('svg', function() {

    gulp.src('icons/*.svg')
        .pipe(rsp.remove({
            properties: [rsp.PROPS_FILL]
        }))
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(gulp.dest('img'));

    // create fallback
    gulp.src('icons/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('img/fallback'));
});



// Watch & Run
gulp.task('default', function() {

    browserSync.init({
        server : {
            baseDir : "./"
        },
        browser : 'google chrome'
    });

    gulp.watch('icons/*.svg', ['svg']).on('change', browserSync.reload);
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/vendor/*.js', ['js-vendor']).on('change', browserSync.reload);
    gulp.watch('js/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);

});
