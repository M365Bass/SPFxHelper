const execSync = require("child_process").execSync;

// const commands = [`node 1PkgVer.js`, `npm list -g --depth=0`];
const commands = [`node 2FastServe.js`, `npm list -g --depth=0`];

for (let index = 0; index < commands.length; index++) {
  const command = commands[index];
  console.log(command);
  execSync(command);
}
