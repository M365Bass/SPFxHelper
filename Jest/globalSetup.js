const fs = require("fs");
const execSync = require("child_process").execSync;
const parentFolderPath = require("../Utils/folderPaths").parentFolderPath();
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();

module.exports = function () {
  // console.log();
  // process.env.initialPath = process.cwd();
  // console.log("process.env.initialPath");
  // console.log(process.env.initialPath);

  fs.mkdirSync(parentFolderPath, { recursive: true });
  execSync("npm install gulp-cli yo @microsoft/generator-sharepoint --global", {
    stdio: [],
  });
  process.chdir(parentFolderPath);
  execSync(
    'yo @microsoft/sharepoint --solution-name "VanillaSolution" --framework "react"' +
      ' --component-type "webpart" --component-name "WebPart1" --skip-install --environment "spo" ',
    { stdio: [] }
  );

  process.chdir(wpFolderPath);
};
