const fs = require("fs");
const os = require("os");

const parentFolderPath = require("../Utils/folderPaths").parentFolderPath();

module.exports = function () {
  process.chdir(os.homedir());

  fs.rmSync(parentFolderPath, {
    recursive: true,
    force: true,
  });

  // revert to initial working dir from setup
  process.chdir(process.env.initialPath);
};
