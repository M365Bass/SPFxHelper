const fs = require("fs");
const execSync = require("child_process").execSync;

const gulpfilePath = ".\\testWPs\\TestSolution\\gulpfile.js";
beforeEach(() => {
  execSync(`node .\\1PkgVer.js -path ${gulpfilePath}`);
});

test("1PkgVer Test", () => {
  const dataAfter = fs.readFileSync(gulpfilePath, "utf8");

  const gulpDotJS = fs.readFileSync(".\\Sources\\gulp.js", "utf8");

  const x = dataAfter.indexOf(
    "pkgSolution.solution.version = newVersionNumber;"
  );
  console.log(x);

  expect(dataAfter).toContain(
    "pkgSolution.solution.version = newVersionNumber;"
  );
});

afterEach(() => {
  execSync(`git checkout --  ${gulpfilePath}`);
});
