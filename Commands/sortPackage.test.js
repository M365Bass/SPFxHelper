const fs = require("fs");
const join = require("path").join;
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();
const sortPackage = require("./sortPackage");
const sortObject = require("sort-object-keys");

const packageJSON_filePath = join(wpFolderPath, "package.json");

beforeEach(() => {
  packageJSON_beforeChanges = fs.readFileSync(packageJSON_filePath, "utf8");
  sortPackage(packageJSON_filePath);
  packageJSON_afterChanges = fs.readFileSync(packageJSON_filePath, "utf8");
});

test("Package.json file changed", () => {
  expect(packageJSON_afterChanges).not.toEqual(packageJSON_beforeChanges);
});

test("Package.json file sorted", () => {
  depsBefore = JSON.parse(packageJSON_beforeChanges).dependencies;
  depsAfter = JSON.parse(packageJSON_afterChanges).dependencies;

  expect(sortObject(depsBefore)).toEqual(depsAfter);
});

test("Package.json file updated with postinstall script for sort-package-json", () => {
  expect(packageJSON_afterChanges).toContain(
    '"postinstall": "npx sort-package-json"'
  );
});
