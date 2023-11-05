const join = require("path").join;
const dirname = require("path").dirname;
const readFileSync = require("fs").readFileSync;

const replaceInFile = require("../Utils/replaceInFile");
const appendToJSONFile = require("../Utils/appendToJSONFile");
const executeCommand = require("../Utils/executeCommand");

const npmVersion_stringLiterals =
  require("../Sources/stringLiterals").npmVersion;

module.exports = function (gulpfilePath) {
  const gulpSourceFile = join(__dirname, "..", "Sources", "gulp.js");
  const gulpSourceFileData = readFileSync(gulpSourceFile, "utf8");

  replaceInFile(
    npmVersion_stringLiterals.replaceInFile.messages.initialMessage,
    gulpfilePath,
    npmVersion_stringLiterals.replaceInFile.source,
    gulpSourceFileData,
    npmVersion_stringLiterals.replaceInFile.checkString,
    npmVersion_stringLiterals.replaceInFile.messages.successMessage,
    npmVersion_stringLiterals.replaceInFile.messages.warningMessage
  );

  const packageJSON_filePath = join(dirname(gulpfilePath), "package.json");

  appendToJSONFile(
    npmVersion_stringLiterals.appendToJSONFile.messages.initialMessage,
    packageJSON_filePath,
    npmVersion_stringLiterals.appendToJSONFile.jsonContainer,
    npmVersion_stringLiterals.appendToJSONFile.jsonKey,
    npmVersion_stringLiterals.appendToJSONFile.jsonValue,
    npmVersion_stringLiterals.appendToJSONFile.messages.successMessage,
    npmVersion_stringLiterals.appendToJSONFile.messages.errorMessage
  );

  executeCommand("npx prettier --write " + "package.json");
};
