const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const livingcss = require('gulp-livingcss');
const sassImage = require('gulp-sass-image');
const template = require('gulp-nunjucks-render');
const bourbon = require('bourbon').includePaths;
const normalize = require('scss-resets').includePaths;
const data = require('gulp-data');
const copy = require('gulp-copy');
const project = require('./package.json');
const templateData = require('./static/templates/data.json');

const scssAssetPath = [
    'assets/styles/scss/**/*.scss',
    '!assets/styles/scss/lib/mixins/vendor/_imagehelper.scss'
];

const destCssAssetPath = 'assets/styles/';

gulp.task('sass-image', function () {
    return gulp.src('assets/images/**/*.+(jpeg|jpg|png|gif|svg)')
        .pipe(sassImage({
            targetFile: '_imagehelper.scss', // default target filename is '_sass-image.scss'
            // template: 'your-sass-image-template.mustache',
            images_path: 'assets/images/',
            css_path: 'assets/styles/',
            prefix: 'icon-'
        }))
        .pipe(gulp.dest(`${destCssAssetPath}/scss/lib/mixins/vendor`));
});

gulp.task('sass', () => {
    return gulp.src(scssAssetPath)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourcemaps: true,
            outputStyle: 'expanded',
            includePaths: [
                bourbon,
                normalize
            ]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destCssAssetPath));
});

gulp.task('styleguide', () => {
    return gulp.src(`${destCssAssetPath}screen.css`)
        .pipe(livingcss(`${destCssAssetPath}screen.css`, {
            loadcss: false,
            preprocess: function(context, template, Handlebars) {
                context.title = `${project.title} v${project.version}`;
            },
            tags: {
                color: function() {
                    let section = this.sections[this.tag.description];
                    if (section) {
                        section.colors = section.colors || [];
                        let subTags = this.tag.name.split('|');
                        if (subTags.length > 1) {
                            this.tag.name = subTags[0];
                            this.tag.variable = subTags[1];
                        }

                        section.colors.push({
                            name: this.tag.name,
                            value: this.tag.type,
                            variable: this.tag.variable
                        });
                    }
                }
            },
            template :'styleguide/templates/styleguide.hbs'
        }))
        .pipe(gulp.dest('styleguide'))
});

gulp.task('cssmin', () => {
    return gulp.src([`${destCssAssetPath}**.css`, `!${destCssAssetPath}**.min.css`])
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(destCssAssetPath));
});

gulp.task('render', () => {
    return gulp.src('static/templates/*.nunjucks')
        .pipe(data(templateData))
        .pipe(template({
            path: ['static/templates']
        }))
        .pipe(gulp.dest('static/html'))
});

gulp.task('copy', () => {
    return gulp.src([
        'assets/styles/screen.css',
        'assets/images/*'
    ])
    .pipe(copy('static/html', {}));
});

gulp.task('copy-styleguide', () => {
    return gulp.src([
        'assets/styles/screen.css',
        'assets/images/*'
    ])
    .pipe(copy('styleguide', {}));
});

gulp.task('watch', () => {
    gulp.watch(
        scssAssetPath,
        gulp.series(
            'sass-image',
            'sass',
            'cssmin',
            'copy',
            'render',
            'copy-styleguide',
            'styleguide'
        )
    );
});