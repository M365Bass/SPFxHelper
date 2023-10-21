const execSync = require("child_process").execSync;
const ChalkHelper = require("../Utils/ChalkHelper");

module.exports = function (folderPath) {
  if (
    !require("fs").existsSync(
      require("path").join(folderPath, "fast-serve\\config.json")
    )
  ) {
    ChalkHelper.ChalkMessage(`Running npm list -g --depth=0`);
    const npmGlobalPackages = execSync(`npm list -g --depth=0`).toString();

    if (npmGlobalPackages.indexOf("spfx-fast-serve") === -1) {
      ChalkHelper.ChalkMessage(`Installing spfx-fast-serve globally`);
      execSync(`npm install spfx-fast-serve -g`);
    } else {
      ChalkHelper.ChalkMessage("spfx-fast-serve already installed globally");
    }

    console.log("__dirname before");
    console.log(__dirname);
    require("node:process").chdir(folderPath);
    console.log("__dirname after");
    console.log(__dirname);
    ChalkHelper.ChalkMessage(`Running spfx-fast-serve`);
    execSync(`spfx-fast-serve`);
  } else {
    ChalkHelper.ChalkWarning("spfx-fast-serve already configured");
  }
};
