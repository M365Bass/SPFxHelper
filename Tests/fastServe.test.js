const fs = require("fs");
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();
const fastServeCommand = require("../Commands/fastServe");
const resolve = require("path").resolve;

beforeEach(() => {
  fastServeCommand(wpFolderPath);
});

test("fastServe: fast-serve folder created", () => {
  expect(fs.existsSync(resolve(wpFolderPath, "fast-serve"))).toBeTruthy();
});
