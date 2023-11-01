const fs = require("fs");
const resolve = require("path").resolve;
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();
const gitInitCommand = require("../Commands/gitInit");

beforeEach(() => {
  gitInitCommand(wpFolderPath);
});

test("Validate .git folder exists after git init script runs", () => {
  expect(fs.existsSync(resolve(wpFolderPath, ".git"))).toBeTruthy();
});
