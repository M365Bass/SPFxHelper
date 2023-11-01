const fs = require("fs");
const execSync = require("child_process").execSync;
const chalk = require("../Utils/chalk");

module.exports = function (command, stdio = "pipe", resultStartsWith) {
  chalk.Message("Running " + command);

  try {
    if (execSync(command).toString().startsWith(resultStartsWith))
      chalk.Success(command + " ran successfully");
  } catch (error) {
    chalk.Error(command + " did not run successfully");
    fs.writeFileSync("err.log", error.message);
    chalk.Error("Error details logged to err.log in " + process.cwd());
  }
};
