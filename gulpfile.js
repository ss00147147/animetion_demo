/**
 * Created by Berlin on 2016/4/1.
 */
"use strict";

var environment = "develop";//环境设置，option:develop|production
var autoprefixerConfig = {
    browsers: [
        "Android >= 4",
        "Chrome >= 35",
        "Firefox >= 31",
        "Explorer >= 9",
        "iOS >= 7",
        "Opera >= 12",
        "Safari >= 7.1"
    ],
    cascade: true
};
var cssSpriteConfig = {
    stylesheetPath: "./build/",
    spritePath: "./build/",
    spritesmith: {padding: 5},//图片项目间的padding
    filterBy: function (image) {
        //文件名中包含"icon"的才会被css sprite处理
        if (image.url.indexOf("icon") === -1) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    groupBy: function (image) {
        //将图片分组，按照文件夹生成雪碧图,兼容Win与Mac环境
        if (image.path.indexOf('\\') === -1) {
            var pageName = image.path.slice(image.path.search(/src/) + 4).split("/")[0];
        } else {
            var pageName = image.path.slice(image.path.search(/src/) + 4).split("\\")[0];
        }
        return Promise.resolve(pageName);
    },
    hooks: {
        onUpdateRule: function (rule, token, image) {
            var backgroundSizeX = (image.spriteWidth / image.coords.width) * 100;
            var backgroundSizeY = (image.spriteHeight / image.coords.height) * 100;
            var backgroundPositionX = (image.coords.x / (image.spriteWidth - image.coords.width)) * 100;
            var backgroundPositionY = (image.coords.y / (image.spriteHeight - image.coords.height)) * 100;

            backgroundSizeX = isNaN(backgroundSizeX) ? 0 : backgroundSizeX;
            backgroundSizeY = isNaN(backgroundSizeY) ? 0 : backgroundSizeY;
            backgroundPositionX = isNaN(backgroundPositionX) ? 0 : backgroundPositionX;
            backgroundPositionY = isNaN(backgroundPositionY) ? 0 : backgroundPositionY;

            //更新生成后的规则
            rule.insertAfter(token, {
                prop: "background-image",
                value: "url(../img/sprite.png)"
            });
            rule.insertAfter(token, {
                prop: "background-repeat",
                value: "no-repeat"
            });
            rule.insertAfter(token, {
                prop: "background-position",
                value: backgroundPositionX + "% " + backgroundPositionY + "%"
            });
            rule.insertAfter(token, {
                prop: "background-size",
                value: backgroundSizeX + "% " + backgroundSizeY + "%"
            });
        },
        onSaveSpritesheet: function (opts, groups) {
            var file = opts.spritePath + groups[0] + "/img/sprite.png";
            return file;
        }
    }
};

var runSequence = require('run-sequence');
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var del = require("del");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var postcssSprites = require("postcss-sprites");
var sprites = postcssSprites.default;
var px2rem = require("postcss-px2rem");
var cssComb = require("postcss-sorting");
var autoprefixer = require("autoprefixer");
var processhtml = require("gulp-processhtml");
var cssnano = require('gulp-cssnano');

//清理build目录
gulp.task("clean", function () {
    return del([
        "./build/*"
    ]);
});

//清理release目录
gulp.task("cleanRelease", function () {
    return del([
        "./release/*",
        "!./release/index"
    ]);
});

// scss预处理&后处理
gulp.task("scss", function () {
    return gulp.src("./src/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        //post process
        .pipe(postcss([autoprefixer(autoprefixerConfig)]))
        //.pipe(postcss([sprites(cssSpriteConfig)]))
        .pipe(postcss([px2rem({remUnit: 75})]))
        .pipe(postcss([cssComb({"sort-order": "./.csscomb.json"})]))
        .pipe(gulp.dest("./build"))
        .pipe(browserSync.stream())
});

// css后处理
gulp.task("css", function () {
    return gulp.src("./src/**/*.css")
        //post process
        .pipe(postcss([autoprefixer(autoprefixerConfig)]))
        //.pipe(postcss([sprites(cssSpriteConfig)]))
        .pipe(postcss([px2rem({remUnit: 75})]))
        .pipe(postcss([cssComb({"sort-order": "./.csscomb.json"})]))
        .pipe(gulp.dest("./build"))
        .pipe(browserSync.stream())
});

//使用cssnano压缩处理release目录下的所有css
gulp.task('cssnano', function () {
    return gulp.src('./release/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./release'));
});

//
gulp.task("html", function () {
    return gulp.src("./src/**/*.html")
        .pipe(processhtml())
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream())
});

//复制JS与图片到开发目录,排除名称包含"icon"的图标图片
gulp.task("copy", function () {
    return gulp.src(["./src/**/*.{js,jpg,png,json}"])
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream())
});

// 监视文件改动并重新载入
gulp.task("serve", ["scss", "css", "html", "copy"], function () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    gulp.watch("./src/**/*.scss", ["scss"]);
    gulp.watch("./src/**/*.css", ["css"]);
    gulp.watch("./src/**/*icon*.{jpg,png}", ["scss", "css"]);
    gulp.watch("./src/**/*.html", ["html"]);
    gulp.watch(["./src/**/*.{js,jpg,png}"], ["copy"]);
});

gulp.task("buildToRelease", function () {
    gulp.src("./build/**")
        .pipe(gulp.dest("./release"))
});

gulp.task("default", ["serve"], function () {
    // 默认任务，开发环境构建
});

gulp.task("prod", function () {
    runSequence(
        ["clean", "cleanRelease"],
        ["scss", "css", "html", "copy"],
        "buildToRelease"
    );
    gulp.src("./src/**/*.md")
        .pipe(gulp.dest("./release/"))
});
