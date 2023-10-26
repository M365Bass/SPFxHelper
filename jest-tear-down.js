const fs = require("fs");
const folderPath = require("./Utils/folderPath").folderPath();

module.exports = function () {
  fs.rmSync(folderPath, {
    recursive: true,
    force: true,
  });
};
