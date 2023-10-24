const fs = require("fs");
const execSync = require("child_process").execSync;
const resolve = require("path").resolve;

const folderPath = require("path").join(
  require("process").cwd(),
  "testWPs",
  "TestSoln"
);
console.log("folderPath fastServe");
console.log(folderPath);

beforeEach(() => {
  require("./fastServe")(folderPath);
});

test("Validate fast-serve folder exists after spfx-fast-serve is installed and condfigured", () => {
  expect(fs.existsSync(resolve(folderPath, "fast-serve"))).toBeTruthy();
});

afterEach(() => {
  execSync(`git checkout --  ` + resolve(folderPath, ".gitignore"));
  execSync(`git checkout --  ` + resolve(folderPath, "package.json"));
  execSync(`git checkout --  ` + resolve(folderPath, "gulpfile.js"));
  fs.rmSync(resolve(folderPath, "fast-serve"), {
    recursive: true,
    force: true,
  });
});
