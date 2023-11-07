const gitInitCommand = {
  gitInit: function (folderPath) {
    const execSync = require("child_process").execSync;
    const writeFileSync = require("fs").writeFileSync;
    const chalk = require("../Utils/chalk");

    try {
      chalk.Message(`Checking whether git is installed`);
      if (execSync("git --version").toString().startsWith("git version")) {
        chalk.Success(`git installed`);
        try {
          chalk.Message(`Checking whether git is initialised`);
          process.chdir(folderPath);
          if (
            execSync("git status", { stdio: [] })
              .toString()
              .startsWith("On branch")
          ) {
            chalk.Warning("git already initialised");
          }
        } catch (error) {
          try {
            chalk.Message("git initialisation started");
            execSync("git init -b main", { stdio: [] });
            chalk.Success("git initialisation completed");
          } catch (error) {
            chalk.Error("git was not initialised");
            writeFileSync("err.log", error.message);
            chalk.Error("Error details logged to err.log in " + process.cwd());
          }
        }
        return true;
      }
    } catch (error) {
      chalk.Error(`git not installed, please install and retry`, true);
      process.exit(1);
    }
  },
};

module.exports = gitInitCommand;
