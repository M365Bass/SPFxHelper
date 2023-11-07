const fastServeCommand = {
  fastServe: function (folderPath) {
    const join = require("path").join;
    const existsSync = require("fs").existsSync;
    const execSync = require("child_process").execSync;
    const chalk = require("../Utils/chalk");

    if (!existsSync(join(folderPath, "fast-serve", "config.json"))) {
      chalk.Message(`Running npm list -g --depth=0`);
      const npmGlobalPackages = execSync(`npm list -g --depth=0`).toString();

      if (npmGlobalPackages.indexOf("spfx-fast-serve") === -1) {
        chalk.Message(`Installing spfx-fast-serve globally`);
        execSync(`npm install spfx-fast-serve -g`);
        chalk.Success(`spfx-fast-serve installed`);
      } else {
        chalk.Message("spfx-fast-serve already installed globally");
      }

      process.chdir(folderPath);
      chalk.Message(`Running spfx-fast-serve`);
      execSync(`spfx-fast-serve`);
      chalk.Success(`spfx-fast-serve config completed`);
    } else {
      chalk.Warning("spfx-fast-serve already configured");
    }
  },
};

module.exports = fastServeCommand;
