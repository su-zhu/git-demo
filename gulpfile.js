
//css编译压缩，合并没有必要，我们可以在less里边直接引入
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

gulp.task('style',function() {
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({
            stream: true
        }));
});

//js的合并压缩以及混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script',function() {
   gulp.src('src/scripts/*.js')
       .pipe(concat('all.js'))
       .pipe(uglify())
       .pipe(gulp.dest('dist/scripts'))
       .pipe(reload({
           stream: true
       }));
});

//图片复制
gulp.task('image',function() {
   gulp.src('src/images/*.*')
       .pipe(gulp.dest('dist/images'))
       .pipe(reload({
           stream: true
       }));
});

//html压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('htmlmin',function() {
   gulp.src('src/*.html')
       .pipe(htmlmin({
           collapseWhitespace: true,
           removeComments: true,
           removeAttributeQuotes: true
       }))
       .pipe(gulp.dest('dist/'))
       .pipe(reload({
           stream: true
       }));
});

//添加监视自动执行
var browserSync = require('browser-sync');
var reload = browserSync.reload;
gulp.task('serve',function() {
    browserSync({
        server: {
            baseDir: ['dist']
        }
    },function(err,bs) {
        console.log(bs.options.getIn(['urls','local']));
    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['htmlmin']);
});