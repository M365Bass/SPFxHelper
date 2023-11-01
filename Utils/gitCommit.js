const fs = require("fs");
const execSync = require("child_process").execSync;
const chalk = require("./chalk");

module.exports = function (commitMessage) {
  try {
    execSync("git add .", { stdio: [] });
    execSync('git commit -m "' + commitMessage + '"', { stdio: [] });
    chalk.Success("git commit: " + commitMessage);
  } catch (error) {
    try {
      error.stdout.toString().indexOf("nothing to commit, working tree clean");
    } catch (error) {
      chalk.Error("not able to commit to git");
      fs.writeFileSync("err_git_commit.log", error.message);
      chalk.Error(
        "Error details logged to err_git_commit.log in " + process.cwd()
      );
    }
  }
};
