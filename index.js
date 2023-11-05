#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const resolve = require("path").resolve;
const join = require("path").join;

const chalk = require("./Utils/chalk");
const gitCommit = require("./Utils/gitCommit");

const npmVersionCommand = require("./Commands/npmVersion");
const fastServeCommand = require("./Commands/fastServe");
const gitInitCommand = require("./Commands/gitInit");
const sortPackageCommand = require("./Commands/sortPackage");
const runPrettierCommand = require("./Commands/runPrettier");

const program = new Command();

program
  .version("0.0.1")
  .description("An example CLI for managing a directory")
  .option("-p, --path <value>", "path")
  .option("-nv, --npm-version", "NPM version")
  .option("-fs, --fast-serve", "Fast Serve")
  .option("-gi, --git-init", "git init")
  .option("-sp, --sort-package", "sort Package JSON")
  .option("-pr, --prettier", "run prettier")
  .parse(process.argv);

const options = program.opts();

let path;
if (options.path) {
  path = options.path.replace('"', "");
} else {
  path = process.cwd();
}

if (!fs.existsSync(join(path, "gulpfile.js"))) {
  chalk.Error(
    "path not found or does not contain gulpfile.js, exiting with code 1"
  );
  process.exit(1);
}
chalk.Message("SPFx folder path");
chalk.Message(path);

let gitInstalled;
if (options.gitInit) {
  gitInstalled = gitInitCommand(path);
  gitInstalled && gitCommit("gitInit");
}

if (options.npmVersion) {
  npmVersionCommand(resolve(path, "gulpfile.js"));
  gitInstalled && gitCommit("npmVersion");
}

if (options.fastServe) {
  fastServeCommand(path);
  gitInstalled && gitCommit("fastServe");
}

if (options.sortPackage) {
  sortPackageCommand(resolve(path, "package.json"));
  gitInstalled && gitCommit("sortPackage");
}

if (options.prettier) {
  runPrettierCommand(path);
  gitInstalled && gitCommit("prettier");
}
