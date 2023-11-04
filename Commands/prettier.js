const executeCommand = require("../Utils/executeCommand");

module.exports = function (path) {
  executeCommand("npx prettier --write " + path);
};
