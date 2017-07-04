var gulp = require("gulp")
var browserSync = require("browser-sync").create()

var dist = "./dist"
var styles = "./src/css/*.css"

gulp.task("css", function() {
  var postcss = require("gulp-postcss")
  var sourcemaps = require("gulp-sourcemaps")
  var cssnext = require("postcss-cssnext")
  var cssnano = require("cssnano")
  var atImport = require("postcss-import")

  var processors = [
    atImport(),
    cssnext({
      browsers: ["last 2 versions"],
      sourcemap: true
    }),
    cssnano()
  ]
  return gulp
    .src("./src/css/main.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(gulp.dest(dist))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
})

gulp.task("serve", ["css"], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })

  gulp.watch(styles, ["css"])
  gulp.watch("index.html").on("change", browserSync.reload)
})

gulp.task("default", ["serve"])
