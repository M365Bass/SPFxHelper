const fs = require("fs");
const os = require("os");
const execSync = require("child_process").execSync;
const join = require("path").join;
const folderPath = require("./Utils/folderPath").folderPath();

module.exports = function () {
  fs.mkdirSync(folderPath, { recursive: true });
  process.chdir(folderPath);
  execSync(
    'yo @microsoft/sharepoint --solution-name "VanillaSolution" --framework "react"' +
      ' --component-type "webpart" --component-name "WebPart1" --skip-install --environment "spo" ',
    { stdio: [] }
  );
};
