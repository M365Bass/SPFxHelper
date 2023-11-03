const fs = require("fs");
const os = require("os");

const parentFolderPath = require("../Utils/folderPaths").parentFolderPath();

module.exports = function () {
  process.chdir(os.homedir());

  fs.rmSync(parentFolderPath, {
    recursive: true,
    force: true,
  });

  // console.log("process.cwd() after everything");
  // console.log(process.cwd());
  // process.chdir(process.env.initialPath);
  // console.log("process.env.initialPath");
  // console.log(process.env.initialPath);
  // console.log("process.cwd() now everything");
  // console.log(process.cwd());
};
