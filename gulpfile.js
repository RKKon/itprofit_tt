import gulp from 'gulp';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';


const bs = browserSync.create();
const sassCompiler = gulpSass(dartSass);

export const server = () => {
    bs.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', bs.reload);
};

export const styles = () => {
    return gulp.src("src/sass/**/*.+(sass|scss)")
        .pipe(sassCompiler({ outputStyle: 'compressed' }).on('error', sassCompiler.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(bs.stream());
};

export const scripts = () => {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(bs.stream());
};

export const html = () => {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
};

export const images = () => {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
        .pipe(bs.stream());
};

export const fonts = () => {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(bs.stream());
};

export const icons = () => {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))
        .pipe(bs.stream());
};

export const watchFiles = () => {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", styles);
    gulp.watch("src/*.html", gulp.series(html, bs.reload));
    gulp.watch("src/js/**/*.js", scripts);
    gulp.watch("src/fonts/**/*", fonts);
    gulp.watch("src/icons/**/*", icons);
    gulp.watch("src/img/**/*", images);
};

const build = gulp.parallel(watchFiles, server, styles, scripts, fonts, icons, html, images);
gulp.task('default', build);
