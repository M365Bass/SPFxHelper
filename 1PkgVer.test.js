const fs = require("fs");
const execSync = require("child_process").execSync;

const gulpfilePath = ".\\testWPs\\TestSoln\\gulpfile.js";
beforeEach(() => {
  execSync(`node .\\1PkgVer.js -path ${gulpfilePath}`);
});

test("1PkgVer Test", () => {
  const dataAfter = fs.readFileSync(gulpfilePath, "utf8");

  expect(dataAfter).toContain(
    "pkgSolution.solution.version = newVersionNumber;",
  );
});

afterEach(() => {
  execSync(`git checkout --  ${gulpfilePath}`);
});
