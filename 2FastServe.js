var fs = require("fs");
const { Command } = require("commander");
const execSync = require("child_process").execSync;
const { chdir, cwd } = require("node:process");
const CHLK = require("./Utils/ChalkHelper");

function FastServe() {
  CHLK.ChalkMessage(`npm list -g --depth=0`);
  const npmGlobalPackages = execSync(`npm list -g --depth=0`).toString();

  if (npmGlobalPackages.indexOf("spfx-fast-serve") === -1) {
    CHLK.ChalkMessage(`npm install spfx-fast-serve -g`);
    execSync(`npm install spfx-fast-serve -g`);
  } else {
    CHLK.ChalkMessage("Package already installed");
  }

  const program = new Command();

  program
    .option("-path [value]", "provide webpart folder path")
    .parse(process.argv);

  const options = program.opts();

  chdir(options.Path);
  CHLK.ChalkMessage(cwd());

  CHLK.ChalkMessage(`spfx-fast-serve`);
  execSync(`spfx-fast-serve`);
}

module.exports = FastServe;
FastServe();
