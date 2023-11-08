const executeCommand = require("./executeCommand");

module.exports = function (path) {
  executeCommand("prettier --write " + path);
};
