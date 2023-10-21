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

exports.ChalkError = function (message) {
  console.log(chalk.red("Error - " + message));
};
