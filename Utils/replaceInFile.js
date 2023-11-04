const fs = require("fs");
const chalk = require("./chalk");

const executeCommand = require("../Utils/executeCommand");

/**
 * @param checkString string to check if exists before replace occurs
 */
module.exports = function (
  initialMessage,
  filePath,
  textToReplace,
  replacementText,
  checkString,
  successMessage,
  WarningMessage
) {
  chalk.Message(initialMessage);

  executeCommand("npx prettier --write " + filePath);

  const fileData = fs.readFileSync(filePath, "utf8");

  if (fileData.indexOf(checkString) === -1) {
    var result = fileData.replace(textToReplace, replacementText);

    if (result !== fileData) {
      fs.writeFileSync(filePath, result);
      chalk.Success(successMessage);
    } else {
      chalk.Warning(WarningMessage);
    }
  } else {
    chalk.Warning(WarningMessage);
  }
};
