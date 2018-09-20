var gulp = require("gulp");
var htmlclean = require("gulp-htmlclean");//gulp-htmlclean  html压缩工具
var stripDebug = require("gulp-strip-debug"); //删除js代码中的console.log和debugger语句
var uglify = require("gulp-uglify"); //压缩js代码工具
var concat = require("gulp-concat"); //js代码合并工具
var deporder = require("gulp-deporder");
var less = require("gulp-less");    //less转成css
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer"); //给css加前缀：transform-> -webkit-transform
var cssnano = require("cssnano"); //压缩css代码
var imagemin = require("gulp-imagemin"); //Minify PNG, JPEG, GIF and SVG images


var connect = require("gulp-connect"); //Gulp plugin to run a local webserver with livereload enabled via socket.io. Also comes with standalone command-line interface.

var folder = {
    src: "src/",
    dist: "dist/"
}


var node = process.env.NODE_ENV == "development";
console.log(node);
gulp.task("html", function () {
    var stream = gulp.src(folder.src + "pages/*")
                    .pipe(connect.reload());
    if(!node){
        stream.pipe(htmlclean())
    }

    stream.pipe(gulp.dest(folder.dist + "pages/"));
});

gulp.task("js", function () {
    var stream = gulp.src(folder.src + "js/*")
                    .pipe(connect.reload());
    if(!node) {
        stream.pipe(stripDebug())
            .pipe(uglify())
            .pipe(concat("main.js"))
    }
    stream.pipe(gulp.dest(folder.dist + "js/"));
});

gulp.task("image", function () {
    gulp.src(folder.src + "img/*")
        .pipe(connect.reload())
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "img/"));
});

gulp.task("css", function () {
    var stream = gulp.src(folder.src + "css/*")
                    .pipe(connect.reload())
                    .pipe(less());
    var plugins = [autoprefixer()];
    if(!node) {
        plugins.push(cssnano())
    }
    stream.pipe(postcss(plugins))
        .pipe(gulp.dest(folder.dist + "css/"));
});

gulp.task("watch", function () {
    gulp.watch(folder.src + "pages/*", ["html"]);
    gulp.watch(folder.src + "js/*", ["js"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "img/*", ["image"]);
})

gulp.task("server", function () {
    connect.server({
        port: 8080,
        livereload: true
    });
});

gulp.task("default", ["css", "image", "html", "js", "watch", "server"]);