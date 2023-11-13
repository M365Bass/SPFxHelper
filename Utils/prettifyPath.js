const executeCommandUtil = require("./executeCommand");

module.exports = function (path) {
  executeCommandUtil.executeCommand("prettier --write " + path);
};
