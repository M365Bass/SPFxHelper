const execSync = require("child_process").execSync;
const ChalkHelper = require("../Utils/ChalkHelper");

module.exports = function (folderPath) {
  try {
    ChalkHelper.ChalkMessage(`Checking whether git is installed`);
    if (execSync("git --version").toString().startsWith("git version")) {
      ChalkHelper.ChalkSuccess(`git installed`);

      try {
        ChalkHelper.ChalkMessage(`Checking whether git is initialised`);
        process.chdir(folderPath);
        if (
          execSync("git status", { stdio: [] })
            .toString()
            .startsWith("On branch")
        ) {
          ChalkHelper.ChalkWarning("git already initialised");
        }
      } catch (error) {
        try {
          ChalkHelper.ChalkMessage("git initialisation started");
          execSync("git init -b main", { stdio: [] });
          ChalkHelper.ChalkSuccess("git initialisation completed");
        } catch (error) {
          ChalkHelper.ChalkError("git was not initialised");
          require("fs").writeFileSync("err.log", error.message, "utf8");
          ChalkHelper.ChalkError(
            "Error details logged to err.log in " + process.cwd()
          );
        }
      }
    }
    return true;
  } catch (error) {
    ChalkHelper.ChalkError(`git not installed, please install and retry`, true);
    process.exit(1);
  }
};
