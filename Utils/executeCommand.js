const fs = require("fs");
const cp = require("child_process");
const chalk = require("../Utils/chalk");

const executeCommandUtil = {
  executeCommand: function (command) {
    chalk.Message("Running " + command);

    try {
      cp.execSync(command);
      chalk.Success(command + " ran successfully");
    } catch (error) {
      chalk.Error(command + " did not run successfully");
      fs.writeFileSync("err.log", error.message);
      chalk.Error("Error details logged to err.log in " + process.cwd());
    }
  },
};

module.exports = executeCommandUtil;
