const fs = require("fs");
const execSync = require("child_process").execSync;
const parentFolderPath = require("../Utils/folderPaths").parentFolderPath();
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();

module.exports = function () {
  // save current working dir in to revert to it in teardown
  process.env.initialPath = process.cwd();
  execSync("npm link", {
    stdio: [],
  });

  fs.mkdirSync(parentFolderPath, { recursive: true });

  const packagesToInstallGlobally = [
    "prettier",
    "sort-package-json",
    "gulp-cli",
    "yo",
    "@microsoft/generator-sharepoint",
  ];

  console.log();
  packagesToInstallGlobally.forEach((package_name) => {
    execSync(`npm list -g ${package_name} || npm install -g ${package_name}`);
    console.log(package_name);
  });

  process.chdir(parentFolderPath);

  execSync(
    `yo @microsoft/sharepoint --solution-name "VanillaSolution" --framework "react"` +
      ` --component-type "webpart" --component-name "WebPart1" --skip-install --environment "spo" `,
    { stdio: [] }
  );

  process.chdir(wpFolderPath);
};
