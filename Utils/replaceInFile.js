var fs = require("fs");
const ChalkHelper = require("../Utils/ChalkHelper");

module.exports = function (
  filePath,
  textToReplace,
  replacementText,
  successMessage,
  WarningMessage
) {
  const fileData = fs.readFileSync(filePath, "utf8");

  var result = fileData.replace(textToReplace, replacementText);

  if (result !== fileData) {
    fs.writeFileSync(filePath, result, "utf8");
    ChalkHelper.ChalkSuccess(successMessage);
  } else {
    ChalkHelper.ChalkWarning(WarningMessage);
  }
};
