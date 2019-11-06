var gulp = require('gulp')
var less = require("gulp-less");
var minifyCss = require("gulp-minify-css")
var zip = require('gulp-zip');

gulp.task('compile-less', function () {
	return gulp.src('./assets/css/screen.less')
    .pipe(less())
    .pipe(minifyCss())
	.pipe(gulp.dest('./assets/css'));
})
gulp.task('copy-assets', function () {
    return gulp.src(['./assets/**'])
        .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('copy-partials', function () {
    return gulp.src(['./partials/*'])
        .pipe(gulp.dest('./dist/partials/'));
});

gulp.task('copy-hbs', function () {
    return gulp.src(['*.hbs'])
        .pipe(gulp.dest('./dist/'))
})

gulp.task('copy-plugin', function () {
    return gulp.src(['./assets/plugins/*'])
        .pipe(gulp.dest('./dist/assets/plugins/'));
});

gulp.task('copy-json', function () {
    return gulp.src('package.json')
        .pipe(gulp.dest('./dist/'))
})

gulp.task('copy', ['copy-assets', 'copy-partials', 'copy-hbs', 'copy-json'])
gulp.task('builder', ['compile-less', 'copy'])

gulp.task('zip', function () {
    return gulp.src('./dist/**').pipe(zip('theme-archive.zip')).pipe(gulp.dest('../'));
})

gulp.task('data-prepare', ['builder', 'copy'])

gulp.task('default', ['data-prepare', 'zip'])