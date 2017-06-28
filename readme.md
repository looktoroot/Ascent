# Проект для портфолио "Cuda"
- HTML5
- SCSS
- Адаптивная верстка
- Flexbox
- БЕМ
- Gulp
- Stylelint

## Парадигма

- Используется данный [кодгайд](https://epixx.github.io/code-guide/).
- В качестве критериев верстки использовался [этот список](https://nicothin.github.io/criteria-of-quality-frontend/index-0.0.3.html).
- Раскладка блоков на Flexbox.
- Используется именование классов, файлов и переменных по БЭМ.
- Каждому блоку БЭМ соответствует свой стилевой файл, затем подключаемый в общий файл стилей `./src/scss/style.scss`.
- Все цвета, размеры шрифтов, размеры экранов вынесены в отдельный файл переменных `./src/scss/variables.scss`.
- Используется `normalize.scss`.
- Мелкие иконки социальных сетей собраны в svg-спрайт по принципу ` symbol > use`.
- Используется Stylelint (в качестве плагина редактора), описанные в файле `.stylelintrc` проверки взяты [отсюда](https://github.com/nicothin/stylelint-less-test/blob/master/.stylelintrc).

## Автоматизация

После клониврования репозитория требуется установка зависимостей.  
`npm install` - установка зависимостей.  
`bower install` - установка библиотек bower (jQuery).

### Постпроцессинг

1. autoprefixer
2. css-mqpacker
3. gulp-imagemin
4. gulp-concat
5. gulp-uglifyjs
6. gulp-cssnano

### Команды gulp

Полное описание в `gulpfile.js`  
`gulp` -задача по-умолчанию, запускаетс сервер слежения за файлами.  
`gulp images` - оптимизация изображений (png, jpeg, gif), запускается отдельно перед сборкой.  
`gulp build` - сборка проекта в папку `/build` (css при этом - минимизируется, js - конкатенируется и углефицируется).  
`gulp deploy` - выгрузка содержимого папки `/build` в отдельную ветку на GH-pages.
