const sortPackageCommand = {
  sortPackage: function (packageJSON_filePath) {
    const replaceInFile = require("../Utils/replaceInFile");
    const executeCommand = require("../Utils/executeCommand");

    replaceInFile(
      "npx sort-package-json",
      packageJSON_filePath,
      `"scripts": {`,
      `"scripts": {\n` + `"postinstall": "npx sort-package-json",\n`,
      `postinstall": "npx sort-package-json`,
      "gulpfile updated with npx sort-package-json",
      "gulpfile already contains npx sort-package-json"
    );

    executeCommand("npx sort-package-json");
  },
};

module.exports = sortPackageCommand;
