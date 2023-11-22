const executeCommandUtil = require("./executeCommand");

const prettifyPathUtil = {
  /**
   * @param checkString string to check if exists before replace occurs
   */

  prettifyPath: function (path) {
    executeCommandUtil.executeCommand("prettier --write " + path);
  }
};
module.exports = prettifyPathUtil;
