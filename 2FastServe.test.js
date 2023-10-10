const fs = require("fs");
const execSync = require("child_process").execSync;

const path = ".\\testWPs\\TestSolution\\gulpfile.js";

beforeEach(() => {
  execSync(`node .\\2FastServe.js -path ${path}`);
});

test("spfx-fast-serve installed and configured", () => {
  expect(fs.existsSync(".\\testWPs\\TestSolution\\\\fast-serve")).toBeTruthy();
});

afterEach(() => {
  execSync(`git checkout --  ${path}\\.gitignore`);
  execSync(`git checkout --  ${path}\\package.json`);
  fs.rmSync(path + "\\fast-serve", { recursive: true, force: true });
});
