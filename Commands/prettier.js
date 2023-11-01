const executeCommand = require("../Utils/executeCommand");

module.exports = function (folderPath) {
  process.chdir(folderPath);
  executeCommand("npx prettier --write .", folderPath);
};
