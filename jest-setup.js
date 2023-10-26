const fs = require("fs");
const execSync = require("child_process").execSync;
const parentFolderPath = require("./Utils/folderPaths").parentFolderPath();

module.exports = function () {
  fs.mkdirSync(parentFolderPath, { recursive: true });
  process.chdir(parentFolderPath);
  execSync(
    'yo @microsoft/sharepoint --solution-name "VanillaSolution" --framework "react"' +
      ' --component-type "webpart" --component-name "WebPart1" --skip-install --environment "spo" ',
    { stdio: [] }
  );
};
