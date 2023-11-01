var fs = require("fs");
const chalk = require("../Utils/chalk");

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
    if (result.indexOf("/* end of npm version */") === -1)
      result2 = result.replace(source2, gulpSourceFileData);
    else result2 = result;
  }

  if (result2 !== gulpfilePathData) {
    fs.writeFileSync(gulpfilePath, result2);
    chalk.Success(`gulpfile updated with npm version script`);
  } else {
    chalk.Warning(`gulpfile already contains npm version script`);
  }
};
