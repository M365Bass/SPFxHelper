const fs = require("fs");
const join = require("path").join;
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();
const sortPackage = require("./sortPackage");

const gulpfilePath = join(wpFolderPath, "package.json");
console.log(gulpfilePath);

beforeEach(() => {
  sortPackage(gulpfilePath);
});

test("Gulp file updated with postinstall script for sort-package-json", () => {
  expect(fs.readFileSync(gulpfilePath, "utf8")).toContain(
    '"postinstall": "npx sort-package-json"'
  );
});
