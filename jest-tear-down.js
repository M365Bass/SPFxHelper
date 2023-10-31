const fs = require("fs");
const os = require("os");

const parentFolderPath = require("./Utils/folderPaths").parentFolderPath();

module.exports = function () {
  process.chdir(os.homedir());

  fs.rmSync(parentFolderPath, {
    recursive: true,
    force: true,
  });
};
