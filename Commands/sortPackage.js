const replaceInFile = require("../Utils/replaceInFile");
const executeCommand = require("../Utils/executeCommand");

module.exports = function (packageJSON_filePath) {
  executeCommand(
    "npx sort-package-json",
    packageJSON_filePath,
    "package.json is sorted!"
  );

  replaceInFile(
    "npx sort-package-json",
    packageJSON_filePath,
    '"scripts": {',
    '"scripts": {\n' + '"postinstall": "npx sort-package-json",\n',
    `gulpfile updated with npx sort-package-json`,
    `gulpfile already contains npx sort-package-json`
  );
};
