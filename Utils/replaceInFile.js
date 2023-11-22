const fs = require("fs");
const chalk = require("./chalk");

const prettifyPathUtil = require("../Utils/prettifyPath");

const replaceInFileUtil = {
  /**
   * @param checkString string to check if exists before replace occurs
   */

  replaceInFile: function (
    initialMessage,
    filePath,
    textToReplace,
    replacementText,
    checkString,
    successMessage,
    WarningMessage
  ) {
    chalk.Message(initialMessage);

    prettifyPathUtil.prettifyPath(filePath);

    const fileData = fs.readFileSync(filePath, "utf8");

    if (fileData.indexOf(checkString) === -1) {
      var result = fileData.replace(textToReplace, replacementText);

      fs.writeFileSync(filePath, result);
      chalk.Success(successMessage);
    } else {
      chalk.Warning(WarningMessage);
    }
  }
};

module.exports = replaceInFileUtil;
