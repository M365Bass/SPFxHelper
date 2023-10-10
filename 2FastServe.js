var fs = require("fs");
const { Command } = require("commander");
const execSync = require("child_process").execSync;
const { chdir, cwd } = require("node:process");

function FastServe() {
  console.log(`npm list -g --depth=0`);
  const npmGlobalPackages = execSync(`npm list -g --depth=0`).toString();

  if (npmGlobalPackages.indexOf("spfx-fast-serve") === -1) {
    console.log(`npm install spfx-fast-serve -g`);
    execSync(`npm install spfx-fast-serve -g`);
  } else {
    console.log("Package already installed");
  }

  const program = new Command();

  program
    .option("-path [value]", "provide webpart folder path")
    .parse(process.argv);

  const options = program.opts();

  chdir(options.Path);
  console.log(cwd());

  console.log(`spfx-fast-serve`);
  execSync(`spfx-fast-serve`);
}

module.exports = FastServe;
FastServe();
