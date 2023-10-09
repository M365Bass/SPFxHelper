const { Command } = require("commander");

const program = new Command();

program
  .option("-path [value]", "provide webpart folder path")
  .parse(process.argv);

const options = program.opts();
console.log(options);

var fs = require("fs");
console.log("automate");

const filePath1 = options.Path;
const source1 = "const build = require('@microsoft/sp-build-web');";
const replacement1 =
  'const gulp = require("gulp");\n' +
  'const build = require("@microsoft/sp-build-web");';

const source2 = "build.initialize(require('gulp'));";
fs.readFile("./gulp", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  replace(filePath1, [source1, source2], [replacement1, data]);

  console.log("timeout 5s");
  setTimeout(function () {
    console.log("timeout 5s complete");
    const execSync = require("child_process").execSync;
    console.log(`npx prettier ${filePath1} --write`);
    execSync(`npx prettier ${filePath1} --write`);
  }, 5000);
});

function replace(filePath, source, replacement) {
  console.log("replace");
  fs.readFile(filePath1, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

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
}
