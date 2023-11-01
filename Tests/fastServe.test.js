const fs = require("fs");
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();
const fastServeCommand = require("../Commands/fastServe");
const resolve = require("path").resolve;

beforeEach(() => {
  fastServeCommand(wpFolderPath);
});

test("Validate fast-serve folder exists after spfx-fast-serve is installed and configured", () => {
  expect(fs.existsSync(resolve(wpFolderPath, "fast-serve"))).toBeTruthy();
});
