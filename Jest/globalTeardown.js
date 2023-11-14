const fs = require("fs");
const os = require("os");
const execSync = require("child_process").execSync;
const parentFolderPath = require("../Utils/folderPaths").parentFolderPath();

module.exports = function () {
  //skip when running in GitHub
  if (process.env.GITHUB_JOB !== undefined) return;

  // start teardown
  process.chdir(os.homedir());

  execSync("npm uninstall prettier sort-package-json --global");

  fs.rmSync(parentFolderPath, {
    recursive: true,
    force: true,
  });

  // revert to initial working dir from setup
  process.chdir(process.env.initialPath);
};
