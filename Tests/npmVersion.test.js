const fs = require("fs");
const join = require("path").join;
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();
const npmVersionCommand = require("../Commands/npmVersion");

const gulpfilePath = join(wpFolderPath, "gulpfile.js");

beforeEach(() => {
  npmVersionCommand(gulpfilePath);
});

test("npmVersion: gulp file updated with 'pkgSolution.solution.version = newVersionNumber'", () => {
  const gulpfilePathData = fs.readFileSync(gulpfilePath, "utf8");
  expect(gulpfilePathData).toContain(
    "pkgSolution.solution.version = newVersionNumber;"
  );
});
