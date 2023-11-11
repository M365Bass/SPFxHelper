const executeCommand = require("./executeCommand");

module.exports = function (path) {
  executeCommand("npx -c prettier --write " + path);
};
