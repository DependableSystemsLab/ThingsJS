var exec = require('child_process').exec;
var chalk = require('chalk');
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', [ 'docs', 'test' ]);

/** Compile JSDoc html output to /docs/ directory */
gulp.task('docs', function(){
	return exec('./node_modules/.bin/jsdoc -d ./docs/ -r ./lib/core');
});

/** Run mocha tests */
gulp.task('test', function(){
	return gulp.src('test/run-all.js', { read: false })
		.pipe(mocha());
});

gulp.task('all', ['docs', 'test'], function(){

});