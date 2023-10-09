var fs = require("fs");
const { Command } = require("commander");
const execSync = require("child_process").execSync;

function PkgVer() {
  const program = new Command();

  program
    .option("-path [value]", "provide webpart folder path")
    .parse(process.argv);

  const options = program.opts();

  const filePath = options.Path;
  const source1 = "const build = require('@microsoft/sp-build-web');";
  const replacement1 =
    'const gulp = require("gulp");\n' +
    'const build = require("@microsoft/sp-build-web");';

  const source2 = "build.initialize(require('gulp'));";
  fs.readFile(".\\Sources\\gulp.js", "utf8", function (err, data) {
    if (err) return console.log(err);

    const source = [source1, source2];
    const replacement = [replacement1, data];

    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) return console.log(err);

      if (source.length === replacement.length) {
        var result = data.replace(source[0], replacement[0]);
        for (let index = 1; index < source.length; index++) {
          const sourceOfIndex = source[index];
          const replacementOfIndex = replacement[index];
          result = result.replace(source[index], replacement[index]);
        }
      }

      fs.writeFile(filePath, result, "utf8", function (err) {
        if (err) return console.log(err);
      });
    });

    setTimeout(function () {
      console.log(`npx prettier ${filePath} --write`);
      execSync(`npx prettier ${filePath} --write`);
    }, 2000);
  });
}

module.exports = PkgVer;
PkgVer();
