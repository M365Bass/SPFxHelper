const fs = require("fs");
const execSync = require("child_process").execSync;

const path = ".\\testWPs\\TestSolution\\gulpfile.js";
beforeEach(() => {
  execSync(`node .\\1PkgVer.js -path ${path}`);
});

test("File changed", () => {
  const dataAfter = fs.readFileSync(path, "utf8");

  const gulpDotJS = fs.readFileSync(".\\Sources\\gulp.js", "utf8");

  expect(dataAfter).toMatch(gulpDotJS);
});

afterEach(() => {
  execSync(`git checkout --  ${path}`);
});
