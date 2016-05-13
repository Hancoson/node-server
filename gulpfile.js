/**
 * Created by Guoxing.han on 2016-4-27.
 */

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    jshint       = require('gulp-jshint'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    imagemin     = require('gulp-imagemin'),
    base64       = require('gulp-base64'), // css图片转base64，阀值<=n字节转换
    cache        = require('gulp-cache'), //图片缓存，只有图片替换了才压缩
    sourcemaps   = require('gulp-sourcemaps'),
    removeLogs   = require('gulp-removelogs'),//删除调试代码
    // 静态文件打包合并
    webpack      = require('gulp-webpack'),
    config       = require('./webpack.config'),
    del          = require('del');

// Environment setup 环境设置
var env      = {
        production: false
    },
    html     = 'pages/',
    css_path = 'src/styles/',
    js_path  = 'src/scripts/',
    img_paht = 'src/images/',
    dist     = 'dist/';

// Environment task.
gulp.task("set-production", function () {
    env.production = true;
});

// Styles
gulp.task('styles', function () {
    var processors = {
        src         : css_path + '*.scss',
        dist        : dist + 'styles',
        autoprefixer: autoprefixer({
            browsers: ['last 2 versions'],
            cascade : true, //是否美化属性值 默认：true
            remove  : true //是否去掉不必要的前缀 默认：true
        })

    };
    if (env.production) {
        //生成版本
        return gulp.src(processors.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(processors.autoprefixer)
            .pipe(base64({
                baseDir     : img_paht, // 指定路径/下图片转换
                extensions  : ['svg', 'png', /\.jpg#datauri$/i], // 指定转换条件
                maxImageSize: 8 * 1024, // bytes，<=8kb转base64
            }))
            .pipe(minifycss())
            .pipe(gulp.dest(processors.dist));
    }
    else {
        //开发版本
        return gulp.src(processors.src)
            .pipe(base64({
                baseDir     : img_paht, // 指定路径/下图片转换
                extensions  : ['svg', 'png', /\.jpg#datauri$/i], // 指定转换条件
                maxImageSize: 8 * 1024, // bytes，<=8kb转base64
            }))
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(processors.autoprefixer)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(processors.dist));
    }
});

//copy
gulp.task('copy', function () {
    gulp.src(['./src/_json/*'])
        .pipe(gulp.dest('dist/_json'));
});
// Scripts
gulp.task('jshint', function () {
    gulp.src([js_path + '*.js', js_path + 'lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('scripts', function () {
    var path = {
        src : './src/scripts/*.js',
        dist: './dist/scripts'
    };

    if (env.production) {
        //生产版本
        console.log('this is release');
        return gulp.src(path.src)
            .pipe(webpack(config))
            .pipe(removeLogs())
            .pipe(uglify().on('error', function (e) {
                console.log('\x07', e.message);
                return this.end();
            }))
            .pipe(gulp.dest(path.dist));
    }
    else {
        //开发版本
        console.log('this is dev');
        return gulp.src(path.src)
            .pipe(webpack(config))
            .pipe(gulp.dest(path.dist));
    }
});
// Images
gulp.task('images', function () {
    return gulp.src('src/images/**')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('dist/images'));
});

// Clean
gulp.task('clean', function () {
    return del(['dist/styles', 'dist/scripts', 'dist/images']);
});

//watch
gulp.task('watch', function () {
    gulp.watch('src/styles/*.scss', ['styles']);

    // Watch .js files
    gulp.watch(['src/scripts/*.js','src/scripts/lib/*.js'], ['scripts']);

    gulp.watch('src/images/**', ['images']);

});

// dev task  开发环境
gulp.task('dev', ['clean'], function () {
    gulp.start('styles', 'images', 'scripts', 'watch');
});

//release task 发布版本
gulp.task('release', ['clean','set-production'], function () {
    gulp.start('styles', 'scripts');
});