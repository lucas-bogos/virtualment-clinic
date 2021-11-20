const { src, dest} = require("gulp");
const compileSass = require("gulp-sass");

// compileSass.compiler = require("node-sass");

const bundleSass = () => {
  return src("public/styles/sass/**/*.scss")
    .pipe(compileSass().on('error', compileSass.logError))
    .pipe(dest("dist/styles/css/"));
};

exports.bundleSass = bundleSass;
