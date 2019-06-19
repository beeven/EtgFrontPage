const gulp = require("gulp");
const concat = require("gulp-concat");
const less = require("gulp-less");
const del = require("del");
const browserSync = require("browser-sync").create();

const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'build/assets/styles/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'build/assets/js/'
    }
};

function clean(){
    return del(["build/"]);
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('build/assets/images'));
}

function vendor() {
    return gulp.src('src/vendor/**/*')
        .pipe(gulp.dest('build/library/'));
}

function html(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build/'));
}

const build = gulp.parallel(html, images, vendor, styles, scripts);

function reload(done) {
    browserSync.reload();
    done();
}

function serve(done){
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        port: 3000
    });
    done();
}


function watch(){
    gulp.watch(paths.scripts.src, gulp.series(scripts,reload)),
    gulp.watch(paths.styles.src, gulp.series(styles,reload)),
    gulp.watch('src/*.html', gulp.series(html,reload));
}

exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = gulp.series(clean, build, gulp.parallel(watch, serve));