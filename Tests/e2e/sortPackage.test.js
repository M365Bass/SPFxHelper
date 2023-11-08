const fs = require("fs");
const join = require("path").join;
const wpFolderPath = require("../../Utils/folderPaths").wpFolderPath();
const sortPackageCommand = require("../../Commands/sortPackage");
const sortObject = require("sort-object-keys");

const packageJSON_filePath = join(wpFolderPath, "package.json");

beforeAll(() => {
  packageJSON_beforeChanges = fs.readFileSync(packageJSON_filePath, "utf8");
  sortPackageCommand.sortPackage(packageJSON_filePath);
  packageJSON_afterChanges = fs.readFileSync(packageJSON_filePath, "utf8");
});

test("sortPackage: Package.json file changed", () => {
  expect(packageJSON_afterChanges).not.toEqual(packageJSON_beforeChanges);
});

test("sortPackage: dependencies in Package.json file sorted", () => {
  depsBefore = JSON.parse(packageJSON_beforeChanges).dependencies;
  depsAfter = JSON.parse(packageJSON_afterChanges).dependencies;

  expect(sortObject(depsBefore)).toEqual(depsAfter);
});

test("sortPackage: postinstall script added", () => {
  expect(packageJSON_afterChanges).toContain(`npx sort-package-json`);
});
