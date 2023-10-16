var fs = require("fs");
const { Command } = require("commander");
const execSync = require("child_process").execSync;
const CHLK = require("./Utils/ChalkHelper");
const path = require("path");

function PkgVer() {
  const program = new Command();

  program
    .option("-path [value]", "provide webpart folder path")
    .parse(process.argv);

  const options = program.opts();

  const gulpfilePath = options.Path;
  const source1 = `const build = require("@microsoft/sp-build-web");`;
  const replacement1 =
    'const gulp = require("gulp");\n' +
    'const build = require("@microsoft/sp-build-web");';

  const source2 = 'build.initialize(require("gulp"));';

  const gulpSourceFile = path.join(__dirname, "\\Sources\\gulp.js");
  fs.readFile(gulpSourceFile, "utf8", function (err, data1) {
    if (err) return CHLK.ChalkError(err);

    const source = [source1, source2];
    const replacement = [replacement1, data1];

    fs.readFile(gulpfilePath, "utf8", function (err, data2) {
      if (err) return CHLK.ChalkError(err);

      if (source.length === replacement.length) {
        var result = data2.replace(source1, replacement1);
        result2 = result.replace(source2, data1);
      }

      fs.writeFile(gulpfilePath, result2, "utf8", function (err) {
        if (err) return CHLK.ChalkError(err);
      });
    });
  });
}

module.exports = PkgVer;
PkgVer();
