const fs = require("fs");
const chalk = require("./chalk");

module.exports = function (
  initialMessage,
  JSONFilePath,
  jsonContainer,
  jsonKey,
  jsonValue,
  successMessage,
  errorMessage
) {
  chalk.Message(initialMessage);

  try {
    const fileData = fs.readFileSync(JSONFilePath, "utf8");
    let JSONcontents = JSON.parse(fileData);
    JSONcontents[jsonContainer][jsonKey] = jsonValue;
    fs.writeFileSync(JSONFilePath, JSON.stringify(JSONcontents));
    chalk.Success(successMessage);
  } catch (error) {
    chalk.Error(errorMessage);
    fs.writeFileSync("err.log", error.message);
    chalk.Error("Error details logged to err.log in " + process.cwd());
  }
};
