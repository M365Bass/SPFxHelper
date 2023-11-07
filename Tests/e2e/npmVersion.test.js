const fs = require("fs");
const join = require("path").join;
const wpFolderPath = require("../../Utils/folderPaths").wpFolderPath();
const npmVersionCommand = require("../../Commands/npmVersion");

const gulpfilePath = join(wpFolderPath, "gulpfile.js");

beforeAll(() => {
  npmVersionCommand.npmVersion(gulpfilePath);
});

test("npmVersion: version-sync gulp task added", () => {
  const gulpfilePathData = fs.readFileSync(gulpfilePath, "utf8");
  expect(gulpfilePathData).toContain(`gulp.task("version-sync"`);
});
