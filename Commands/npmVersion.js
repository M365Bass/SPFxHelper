var fs = require("fs");

module.exports = function (gulpfilePath) {
  const source1 = `const build = require('@microsoft/sp-build-web');`;
  const replacement1 =
    'const gulp = require("gulp");\n' +
    'const build = require("@microsoft/sp-build-web");';

  const source2 = `build.initialize(require('gulp'));`;

  const gulpSourceFile = require("path").join(
    __dirname,
    "..",
    "Sources",
    "gulp.js"
  );
  const gulpSourceFileData = fs.readFileSync(gulpSourceFile, "utf8");

  const source = [source1, source2];
  const replacement = [replacement1, gulpSourceFileData];

  const gulpfilePathData = fs.readFileSync(gulpfilePath, "utf8");

  if (source.length === replacement.length) {
    var result = gulpfilePathData.replace(source1, replacement1);
    result2 = result.replace(source2, gulpSourceFileData);
  }

  fs.writeFileSync(gulpfilePath, result2, "utf8");
};
