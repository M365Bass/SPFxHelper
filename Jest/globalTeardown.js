const fs = require("fs");
const os = require("os");

const parentFolderPath = require("../Utils/folderPaths").parentFolderPath();

module.exports = function () {
  // console.log("initialPath: " + process.env.initialPath);
  // console.log();
  process.chdir(os.homedir());

  fs.rmSync(parentFolderPath, {
    recursive: true,
    force: true,
  });

  process.chdir(process.env.initialPath);
};
