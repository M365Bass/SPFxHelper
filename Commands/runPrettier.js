const runPrettierCommand = {
  runPrettier: function (path) {
    const prettifyPathUtil = require("../Utils/prettifyPath");

    prettifyPathUtil.prettifyPath(path);
  }
};

module.exports = runPrettierCommand;
