const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const livingcss = require('gulp-livingcss');
const bourbon = require("bourbon").includePaths;
const neat = require("bourbon-neat").includePaths;

const scssAssetPath = 'assets/styles/scss/**/*.scss';
const destCssAssetPath = 'assets/styles/';

gulp.task('sass', () => {
    return gulp.src(scssAssetPath)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourcemaps: true,
            outputStyle: 'expanded',
            includePaths: [bourbon, neat]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destCssAssetPath));
});

gulp.task('styleguide', () => {
    return gulp.src(`${destCssAssetPath}screen.css`)
        .pipe(livingcss(`${destCssAssetPath}screen.css`, {
            preprocess: function(context, template, Handlebars) {
                context.title = 'JessGreen.io Style Guide';
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

gulp.task('watch', () => {
    gulp.watch(scssAssetPath, gulp.series('sass', 'cssmin', 'styleguide'));
});

gulp.task('compile', gulp.series('sass', 'cssmin', function(done) {
    gulp.src('assets/images/*')
        .pipe(gulp.dest('dist/assets/images'));

    gulp.src('assets/styles/screen.css')
        .pipe(gulp.dest('dist/assets/styles'));

    gulp.src(['index.html'])
        .pipe(gulp.dest('dist'));

    done();
}));

gulp.task('deploy', () => {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});