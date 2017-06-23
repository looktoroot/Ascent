"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var del = require("del");
var ghPages = require("gulp-gh-pages");
var run = require("run-sequence");
var imagemin = require("gulp-imagemin");
var concat = require("gulp-concat");
var uglify = require("gulp-uglifyjs");
var rename = require("gulp-rename");
var cssnano = require("gulp-cssnano");


// Компиляция sass + автопрефиксер и сборщик медиа выражений(как плагины postcss)
gulp.task("style", function() {
  gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
       mqpacker({
sort: true })
]))

    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Слежка за файлами
gulp.task("serve", function() {
  browserSync.init({
    server: "src",
    notify: false,
  });


  gulp.watch("src/sass/**/*.scss", ["style"]);
  gulp.watch("src/scripts/*.js", ["scripts", browserSync.reload]);
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

// Конкотенация js-библиотек и своих js-скриптов
gulp.task("scripts", function() {
  return gulp.src([
    "bower_components/jquery/dist/jquery.js",
    "src/scripts/*.js"
    ])
    .pipe(concat("script.js"))
    .pipe(gulp.dest("src/js"));
});

//Оптимизация растровых изображений, запускается отдельно вручную
gulp.task("images", function() {
  return gulp.src("src/img/**/*.{png,jpg,gif}")
  .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
]))
    .pipe(gulp.dest("src/img"));
});

// Отчистка build
gulp.task("clean", function() {
  return del([
    "build/**/*",
    "!build/readme.md"
  ]);
});

// Копирование css в build, перед этим минификация
gulp.task("copy:css", function() {
  return gulp.src([
    "src/css/*.css"
    ])
    .pipe(cssnano())
    .pipe(gulp.dest("build/css"));
});

// Копирование js в build, перед этим углефикация
gulp.task("copy:js", function() {
  return gulp.src([
    "src/js/*.js"
    ])
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

// Копирование шрифтов, картинок и html в build
gulp.task("copy", function() {
  return gulp.src([
      "src/fonts/**/*.{woff,woff2}",
      "src/img/**",
      "src/*.html"
], {
base: "src" })
    .pipe(gulp.dest("build"));
});

// Сборка проекта в build, последовательное выполнение задач
gulp.task("build", function(callback) {
  run(
    "clean",
    "style",
    "copy",
    "copy:css",
    "copy:js",
    callback
); });

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task("deploy", function() {
  console.log('---------- Публикация содержимого ./build/ на GH pages');
  return gulp.src("./build/**/*")
    .pipe(ghPages());
});

//Задача по умолчанию
gulp.task("default", ["serve"]);
