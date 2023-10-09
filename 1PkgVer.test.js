const fs = require("fs");
const execSync = require("child_process").execSync;

beforeEach(() => {
  execSync(`node .\\1PkgVer.js -path .\\testWPs\\TestSolution\\gulpfile.js`);
});

test("File changed", () => {
  const dataAfter = fs.readFileSync(
    ".\\testWPs\\TestSolution\\gulpfile.js",
    "utf8"
  );

  const gulpDotJS = fs.readFileSync(".\\Sources\\gulp.js", "utf8");

  console.log(dataAfter === gulpDotJS);
  expect(dataAfter).toMatch(gulpDotJS);
});

// afterEach(() => {
//   clearCityDatabase();
// });
