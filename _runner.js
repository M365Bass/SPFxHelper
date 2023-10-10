function runner() {
  const { Command } = require("commander");
  const fs = require("fs");
  const execSync = require("child_process").execSync;

  const program = new Command();
  program
    .version("1.0.0")
    .description("Helper for SPFx new projects - post scaffolding add-on")
    .option("-path [value]", "provide webpart folder path")
    .parse(process.argv);
  const options = program.opts();

  const gulpfilePath = options.Path + "gulpfile.js";
  if (!options.Path) {
    throw new Error("Path is a required parameter");
  } else {
    if (fs.existsSync(gulpfilePath)) {
      console.log("Path contains gulpfile.js");
    } else {
      console.log(
        "Path does not contain gulpfile.js, please run again with a different path."
      );
      process.exit();
    }
  }

  const commands = [
    `node 1PkgVer.js -path ` + gulpfilePath,
    `npm list -g --depth=0`,
  ];
  // const commands = [`node 2FastServe.js`, `npm list -g --depth=0`];

  for (let index = 0; index < commands.length; index++) {
    const command = commands[index];
    console.log(command);
    execSync(command, { stdio: "inherit" });
  }
}

module.exports = runner;
runner();
