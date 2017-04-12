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
  gulp.watch("src/*.html").on("change", browserSync.reload);
  gulp.watch("src/js/*.js").on("change", browserSync.reload);
});

// Отчистка build
gulp.task("clean", function() {
  return del([
    "build/**/*",
    "!build/readme.md"
  ]);
});

// Копирование всего в build
gulp.task("copy", function() {
  return gulp.src([
      "src/fonts/**/*.{woff,woff2}",
      "src/img/**",
      "src/js/**",
      "src/css/**",
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
