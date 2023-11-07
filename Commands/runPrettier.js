const runPrettierCommand = {
  runPrettier: function (path) {
    const prettifyPath = require("../Utils/prettifyPath");

    prettifyPath(path);
  },
};

module.exports = runPrettierCommand;
