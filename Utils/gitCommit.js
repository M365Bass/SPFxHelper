const fs = require("fs");
const execSync = require("child_process").execSync;
const ChalkHelper = require("./ChalkHelper");

module.exports = function (commitMessage) {
  try {
    execSync("git add .", { stdio: [] });
    execSync('git commit -m "' + commitMessage + '"', { stdio: [] });
    ChalkHelper.ChalkSuccess("git commit: " + commitMessage);
  } catch (error) {
    try {
      error.stdout.toString().indexOf("nothing to commit, working tree clean");
    } catch (error) {
      ChalkHelper.ChalkError("not able to commit to git");
      fs.writeFileSync("err_git_commit.log", error.message, "utf8");
      ChalkHelper.ChalkError(
        "Error details logged to err_git_commit.log in " + process.cwd()
      );
    }
  }
};
