const replaceInFile = require("../Utils/replaceInFile");

module.exports = function (gulpfilePath) {
  replaceInFile(
    gulpfilePath,
    '"scripts": {',
    '"scripts": {\n' + '"postinstall": "npx sort-package-json",\n',
    `gulpfile updated with npx sort-package-json`,
    `gulpfile already contains npx sort-package-json`
  );
};
