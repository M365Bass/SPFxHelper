const fs = require("fs");
const execSync = require("child_process").execSync;
const parentFolderPath = require("../Utils/folderPaths").parentFolderPath();
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();

module.exports = function () {
  // save current working dir in to revert to it in teardown
  process.env.initialPath = process.cwd();

  execSync("npm cache clean --force");

  execSync("npm link");

  fs.mkdirSync(parentFolderPath, { recursive: true });

  let packagesToInstallGlobally = [
    "prettier",
    "sort-package-json",
    "gulp-cli",
    "yo",
    "spfx-fast-serve",
  ];

  console.log();
  console.log(process.version);
  if (process.version.startsWith("v16")) {
    packagesToInstallGlobally.push("@microsoft/generator-sharepoint@1.17.4");
  } else if (process.version.startsWith("v18")) {
    packagesToInstallGlobally.push("@microsoft/generator-sharepoint@1.18");
  }
  console.log("checked");

  packagesToInstallGlobally.forEach((package_name) => {
    execSync(`npm list -g ${package_name} || npm install -g ${package_name}`);
    console.log(package_name);
  });

  process.chdir(parentFolderPath);

  execSync(
    `yo @microsoft/sharepoint --solution-name "VanillaSolution" --framework "react"` +
      ` --component-type "webpart" --component-name "WebPart1" --skip-install --environment "spo" `
  );

  process.chdir(wpFolderPath);
};
