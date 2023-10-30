const fs = require("fs");
const execSync = require("child_process").execSync;
const ChalkHelper = require("../Utils/ChalkHelper");

module.exports = function (command, stdio = "pipe", resultStartsWith) {
  ChalkHelper.ChalkMessage("Running " + command);

  try {
    if (execSync(command).toString().startsWith(resultStartsWith))
      ChalkHelper.ChalkSuccess(command + " ran successfully");
  } catch (error) {
    ChalkHelper.ChalkError(command + " did not run successfully");
    fs.writeFileSync("err.log", error.message, "utf8");
    ChalkHelper.ChalkError(
      "Error details logged to err.log in " + process.cwd()
    );
  }
};
