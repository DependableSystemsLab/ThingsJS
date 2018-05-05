var exec = require('child_process').exec;
var chalk = require('chalk');
var gulp = require('gulp');

gulp.task('default', function(){

});

/** Compile JSDoc html output to /docs/ directory */
gulp.task('docs', function(){
	exec('./node_modules/.bin/jsdoc -d ./docs/ -r ./lib/core');
});

/** Run mocha tests */
gulp.task('test', function(){
	
});

gulp.task('all', ['docs', 'test'], function(){

});