const fs = require("fs");
const execSync = require("child_process").execSync;

const path = ".\\testWPs\\TestSolution\\gulpfile.js";
beforeEach(() => {
  execSync(`node .\\1PkgVer.js -path ${path}`);
});

test("File changed", () => {
  const dataAfter = fs.readFileSync(path, "utf8");

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
  execSync(`git checkout --  ${path}`);
});
