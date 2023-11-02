const join = require("path").join;
const dirname = require("path").dirname;
const readFileSync = require("fs").readFileSync;

const replaceInFile = require("../Utils/replaceInFile");
const appendToJSONFile = require("../Utils/appendToJSONFile");
const executeCommand = require("../Utils/executeCommand");

module.exports = function (gulpfilePath) {
  const gulpSourceFile = join(__dirname, "..", "Sources", "gulp.js");
  const gulpSourceFileData = readFileSync(gulpSourceFile, "utf8");

  replaceInFile(
    "Add npmVersion script",
    gulpfilePath,
    "build.initialize(require('gulp'));",
    gulpSourceFileData,
    "/* npm version */",
    `gulpfile updated with npmVersion script`,
    `gulpfile already contains npmVersion script`
  );

  const packageJSON_filePath = join(dirname(gulpfilePath), "package.json");

  appendToJSONFile(
    "Add postinstall script to package.JSON",
    packageJSON_filePath,
    "scripts",
    "postversion",
    "gulp version-sync && git add . && git commit --amend --no-edit",
    "SUCCESS",
    "ERR"
  );

  executeCommand("npx prettier --write package.json");
};
