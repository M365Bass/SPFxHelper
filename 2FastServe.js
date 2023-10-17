var fs = require("fs");
const { Command } = require("commander");
const execSync = require("child_process").execSync;
const { chdir, cwd } = require("node:process");
const CHLK = require("./Utils/ChalkHelper");
const path = require("path");

function FastServe() {
  const program = new Command();

  program
    .option("-path [value]", "provide webpart folder path")
    .parse(process.argv);

  const options = program.opts();

  if (!fs.existsSync(path.join(options.Path, "fast-serve\\config.json"))) {
    CHLK.ChalkMessage(`Running npm list -g --depth=0`);
    const npmGlobalPackages = execSync(`npm list -g --depth=0`).toString();

    if (npmGlobalPackages.indexOf("spfx-fast-serve") === -1) {
      CHLK.ChalkMessage(`Installing spfx-fast-serve globally`);
      execSync(`npm install spfx-fast-serve -g`);
    } else {
      CHLK.ChalkMessage("spfx-fast-serve already installed globally");
    }

    chdir(options.Path);
    CHLK.ChalkMessage(`Running spfx-fast-serve`);
    execSync(`spfx-fast-serve`);
  } else {
    CHLK.ChalkWarning("spfx-fast-serve already configured");
  }
}

module.exports = FastServe;
FastServe();
