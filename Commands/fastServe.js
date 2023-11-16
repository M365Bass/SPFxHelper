const fastServeCommand = {
  fastServe: function (folderPath) {
    const join = require("path").join;
    const existsSync = require("fs").existsSync;
    const execSync = require("child_process").execSync;
    const chalk = require("../Utils/chalk");

    if (!existsSync(join(folderPath, "fast-serve", "config.json"))) {
      process.chdir(folderPath);
      chalk.Message("Running spfx-fast-serve");
      execSync("spfx-fast-serve");
      chalk.Success("spfx-fast-serve config completed");
    } else {
      chalk.Warning("spfx-fast-serve already configured");
    }
  },
};

module.exports = fastServeCommand;
