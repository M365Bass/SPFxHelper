var fs = require("fs");
const ChalkHelper = require("../Utils/ChalkHelper");
const path = require("path");

module.exports = function (gulpfilePath) {
  const source1 = `const build = require('@microsoft/sp-build-web');`;
  const replacement1 =
    'const gulp = require("gulp");\n' +
    'const build = require("@microsoft/sp-build-web");';

  const source2 = `build.initialize(require('gulp'));`;

  const gulpSourceFile = path.join(__dirname, "..\\Sources\\gulp.js");
  fs.readFile(gulpSourceFile, "utf8", function (err, gulpSourceFileData) {
    if (err) return ChalkHelper.ChalkError(err);

    const source = [source1, source2];
    const replacement = [replacement1, gulpSourceFileData];

    fs.readFile(gulpfilePath, "utf8", function (err, gulpfilePathData) {
      if (err) return ChalkHelper.ChalkError(err);

      if (source.length === replacement.length) {
        var result = gulpfilePathData.replace(source1, replacement1);
        result2 = result.replace(source2, gulpSourceFileData);
      }

      fs.writeFile(gulpfilePath, result2, "utf8", function (err) {
        if (err) return ChalkHelper.ChalkError(err);
      });
    });
  });
};
