/* istanbul ignore file */

const chalk = require("chalk");

exports.Message = function (message) {
  if (!runningJest()) console.log(chalk.blue(message));
};

exports.Success = function (message) {
  if (!runningJest()) console.log(chalk.green("Success - " + message));
};

exports.Warning = function (message) {
  if (!runningJest()) console.log(chalk.yellow(message));
};

exports.Error = function (message, useExitCodeSuffix = false) {
  if (!runningJest())
    if (useExitCodeSuffix) {
      console.log(chalk.red("Error - " + message + ", exiting with code 1"));
    } else {
      console.log(chalk.red("Error - " + message));
    }
};

function runningJest() {
  return ![0, undefined].includes(process.env.JEST_WORKER_ID);
}
