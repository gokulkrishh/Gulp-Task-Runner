var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

/*===============================================
	* Javascript linting and minify task
=================================================*/

gulp.task('scripts', function() {
	console.log('================================================== JS - HINT Task');
	return gulp.src('app/js/**/*.js')
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter(stylish))
	.pipe(uglify())
	.pipe(concat('all.js'))
	.pipe(gulp.dest('build/js'))
});


/*===============================================
	* CSS linting and minify task
=================================================*/




/*=================================================
	* Gulp Default task to run all task
===================================================*/

gulp.task('default', ['scripts'])
