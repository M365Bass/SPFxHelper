const fs = require("fs");
const resolve = require("path").resolve;
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();
const gitInitCommand = require("../Commands/gitInit");

beforeAll(() => {
  gitInitCommand(wpFolderPath);
});

test("gitInit: .git folder created", () => {
  expect(fs.existsSync(resolve(wpFolderPath, ".git"))).toBeTruthy();
});
