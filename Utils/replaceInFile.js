var fs = require("fs");
const ChalkHelper = require("./ChalkHelper");

module.exports = function (
  initialMessage,
  filePath,
  textToReplace,
  replacementText,
  successMessage,
  WarningMessage
) {
  ChalkHelper.ChalkMessage(initialMessage);

  const fileData = fs.readFileSync(filePath, "utf8");

  if (fileData.indexOf(replacementText) === -1) {
    var result = fileData.replace(textToReplace, replacementText);

    if (result !== fileData) {
      fs.writeFileSync(filePath, result, "utf8");
      ChalkHelper.ChalkSuccess(successMessage);
    } else {
      ChalkHelper.ChalkWarning(WarningMessage);
    }
  } else {
    ChalkHelper.ChalkWarning(WarningMessage);
  }
};
