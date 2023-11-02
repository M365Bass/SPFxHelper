const fs = require("fs");
const execSync = require("child_process").execSync;
const chalk = require("../Utils/chalk");

module.exports = function (command) {
  chalk.Message("Running " + command);

  try {
    execSync(command);
    chalk.Success(command + " ran successfully");
  } catch (error) {
    chalk.Error(command + " did not run successfully");
    fs.writeFileSync("err.log", error.message);
    chalk.Error("Error details logged to err.log in " + process.cwd());
  }
};
