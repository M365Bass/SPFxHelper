const sortPackageCommand = {
  sortPackage: function (packageJSON_filePath) {
    const replaceInFileUtil = require("../Utils/replaceInFile");
    const executeCommandUtil = require("../Utils/executeCommand");

    replaceInFileUtil.replaceInFile(
      "npx sort-package-json",
      packageJSON_filePath,
      `"scripts": {`,
      `"scripts": {\n` +
        `"postinstall": "npx sort-package-json package.json package-lock.json",\n`,
      `postinstall": "npx sort-package-json package.json package-lock.json`,
      "package.json updated with npx sort-package-json",
      "package.json already contains npx sort-package-json"
    );

    executeCommandUtil.executeCommand("sort-package-json");
  },
};

module.exports = sortPackageCommand;
