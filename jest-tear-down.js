const fs = require("fs");
const parentFolderPath = require("./Utils/folderPaths").parentFolderPath();

module.exports = function () {
  fs.rmSync(parentFolderPath, {
    recursive: true,
    force: true,
  });
};
