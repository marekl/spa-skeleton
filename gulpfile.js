'use strict';

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	stringify = require('stringify'),
	streamify = require('gulp-streamify'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	htmlmin = require('gulp-htmlmin'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	assign = require('lodash.assign'),
	del = require('del'),
	path = require('path');

var buildDirectory = 'build';

// Javascript
var entryPoint = 'js/index.js'

var cutomOptions =
{
	entries: [entryPoint],
	debug: true
};

var combinedOptions = assign({}, watchify.args, cutomOptions);
var bundler = watchify(browserify(combinedOptions)); 

bundler.transform(stringify,
{
	appliesTo:
	{
		includeExtentions: ['.html']
	},
	minify: true
});

bundler.on('update', buildJavascript);
bundler.on('log', gutil.log.bind(gutil, 'Browserify:'));

function buildJavascript()
{
	return bundler.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error:'))
		.pipe(source(entryPoint))
		.pipe(rename('js/app.min.js'))
		.pipe(streamify(sourcemaps.init(
		{
			loadMaps: true
		})))
		.pipe(streamify(uglify(
		{
			mangle:
			{
				except: ['vm']
			}
		})))
		.pipe(streamify(sourcemaps.write('./')))
		.pipe(gulp.dest(buildDirectory))
		.pipe(connect.reload());
}

gulp.task('build:js', buildJavascript);

// HTML
var htmlGlob = 'html/*.html';

function buildHtml()
{
	return gulp.src(htmlGlob)
		.pipe(htmlmin(
		{
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(buildDirectory))
		.pipe(connect.reload());
}

gulp.task('build:html', buildHtml);

// CSS
var cssGlob = 'css/**/*.css';

function buildCss()
{
	return gulp.src(cssGlob)
		.pipe(sourcemaps.init())
		.pipe(concat('app.min.css'))
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(buildDirectory + '/css'))
		.pipe(connect.reload());
};

gulp.task('build:css', buildCss);

// Build system
gulp.task('build:clean', function()
{
	return del(
	[
		buildDirectory
	]);
});

gulp.task('build', ['build:js', 'build:html', 'build:css']);

// Server
gulp.task('serve', ['build'], function()
{
	connect.server(
	{
		root: buildDirectory,
		port: 4000,
		livereload: true
	});
	
	watch(htmlGlob, buildHtml);
	watch(cssGlob, buildCss);
});

gulp.task('default', function()
{
  // place code for your default task here
});
