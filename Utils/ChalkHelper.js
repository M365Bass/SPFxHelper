/* istanbul ignore file */

const chalk = require("chalk");

exports.ChalkMessage = function (message) {
  console.log(chalk.blue(message));
};

exports.ChalkSuccess = function (message) {
  console.log(chalk.green("Success - " + message));
};

exports.ChalkWarning = function (message) {
  console.log(chalk.yellow(message));
};

exports.ChalkError = function (message, useExitCodeSuffix = false) {
  if (useExitCodeSuffix) {
    console.log(chalk.red("Error - " + message + ", exiting with code 1"));
  } else {
    console.log(chalk.red("Error - " + message));
  }
};
