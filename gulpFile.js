var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');


//server and live reload config
var serverConfig = {
	host : 'localhost',
	port : 3000,
	livereload: true,
	open: true
};

//SERVER
//['html', 'styles', 'scripts', 'watch'] will make sure 'server' task start after finishing all other tasks
gulp.task('server', ['html', 'styles', 'scripts', 'watch'], function () {

	console.log('-------------------->>> SERVER STARTED ');
	return gulp.src('./build') //source of files
		.pipe(webserver(serverConfig));
});

//copy html files to build folder
gulp.task('html', function () {
	console.log('-------------------------->>> HTML Task');
	return gulp.src(['app/*.html', 'app/**/*.html'])
		.pipe(gulp.dest('build')); //copy html files to build folder
});


//Javascript linting and minify task
gulp.task('scripts', function() {
	console.log('-------------------------->>> SCRIPTS Task');

	//app/js/**/*.js will minify & lint .js files in its subfolder
	return gulp.src(['app/js/*.js', 'app/js/**/*.js'])
	.pipe(jshint('.jshintrc')) //check hint error
	.pipe(jshint.reporter(stylish))
	.pipe(uglify()) //minify
	.pipe(concat('all.js')) //concat js files to all.js
	.pipe(gulp.dest('build/js')) //destination
});

//CSS minify task
gulp.task('styles', function() {
	console.log('-------------------------->>> STYLES Task');

	return gulp.src(['app/css/*.css', 'app/css/**/*.css'])
	.pipe(cssmin()) //minify css
	.pipe(concat('styles.css')) //concat
	.pipe(gulp.dest('build/css'))
});

//Watch for files changes and perform HTML SCRIPT, STYLES TASKS
gulp.task('watch', function () {
	console.log('\n ---------------->>> Watching All Files \n');

	gulp.watch(['app/*.html', 'app/**/*.html'], ['html']);
	gulp.watch(['app/*.js', 'app/js/**/*.js'], ['scripts']);
	gulp.watch(['app/*.css', 'app/css/**/*.css'], ['css']);
});


//Default task to run HTML, STYLES, SCRIPT, SERVER, WATCH tasks
gulp.task('default', ['html','styles','scripts', 'watch', 'server']);
