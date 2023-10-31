const replaceInFile = require("../Utils/replaceInFile");
const executeCommand = require("../Utils/executeCommand");

module.exports = function (packageJSON_filePath) {
  replaceInFile(
    "npx sort-package-json",
    packageJSON_filePath,
    '"scripts": {',
    '"scripts": {\n' + '"postinstall": "npx sort-package-json",\n',
    'postinstall": "npx sort-package-json',
    `gulpfile updated with npx sort-package-json`,
    `gulpfile already contains npx sort-package-json`
  );

  executeCommand(
    "npx sort-package-json",
    packageJSON_filePath,
    "package.json is sorted!"
  );
};
