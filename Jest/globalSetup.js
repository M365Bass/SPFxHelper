const fs = require("fs");
const execSync = require("child_process").execSync;
const parentFolderPath = require("../Utils/folderPaths").parentFolderPath();
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();

module.exports = function () {
  // save current working dir in to revert to it in teardown
  process.env.initialPath = process.cwd();

  fs.mkdirSync(parentFolderPath, { recursive: true });

  execSync("npm install prettier sort-package-json --global", {
    stdio: [],
  });
  execSync("npm install gulp-cli yo @microsoft/generator-sharepoint --global", {
    stdio: [],
  });
  process.chdir(parentFolderPath);
  execSync(
    `yo @microsoft/sharepoint --solution-name "VanillaSolution" --framework "react"` +
      ` --component-type "webpart" --component-name "WebPart1" --skip-install --environment "spo" `,
    { stdio: [] }
  );

  process.chdir(wpFolderPath);
};
