const fs = require("fs");
const execSync = require("child_process").execSync;

const path = ".\\testWPs\\TestSolution\\";

beforeEach(() => {
  execSync(`node .\\2FastServe.js -path ${path}`);
});

test("2FastServe Test", () => {
  expect(fs.existsSync(`${path}fast-serve`)).toBeTruthy();
});

afterEach(() => {
  execSync(`git checkout --  ${path}.gitignore`);
  execSync(`git checkout --  ${path}package.json`);
  execSync(`git checkout --  ${path}gulpfile.js`);
  fs.rmSync(path + "\\fast-serve", { recursive: true, force: true });
});
