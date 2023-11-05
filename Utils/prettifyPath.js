const executeCommand = require("./executeCommand");

module.exports = function (path) {
  executeCommand("npx prettier --write " + path);
};
