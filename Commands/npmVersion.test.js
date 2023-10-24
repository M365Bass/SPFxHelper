const gulpfilePath = require("path").join(
  __dirname,
  "..",
  "testWPs",
  "TestSoln",
  "gulpfile.js"
);
console.log(gulpfilePath);

beforeEach(() => {
  require("./npmVersion")(gulpfilePath);
});

test("Gulp file updated with 'pkgSolution.solution.version = newVersionNumber' after npmVersionCommand runs", () => {
  const gulpfilePathData = require("fs").readFileSync(gulpfilePath, "utf8");
  expect(gulpfilePathData).toContain(
    "pkgSolution.solution.version = newVersionNumber;"
  );
});

afterEach(() => {
  require("child_process").execSync(`git checkout -- ${gulpfilePath}`);
});
