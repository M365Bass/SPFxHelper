#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const resolve = require("path").resolve;
const ChalkHelper = require("./Utils/ChalkHelper");
const npmVersionCommand = require("./Commands/npmVersion");
const fastServeCommand = require("./Commands/fastServe");
const gitInitCommand = require("./Commands/gitInit");
const sortPackageCommand = require("./Commands/sortPackage");

const program = new Command();

program
  .version("0.0.1")
  .description("An example CLI for managing a directory")
  .option("-p, --path <value>", "path")
  .option("-nv, --npm-version", "NPM version")
  .option("-fs, --fast-serve", "Fast Serve")
  .option("-gi, --git-init", "git init")
  .option("-sp, --sort-package", "sort Package JSON")
  .parse(process.argv);

const options = program.opts();

let path;
if (options.path) {
  path = options.path.replace('"', "");
} else {
  path = process.cwd();
}

if (!fs.existsSync(require("path").join(path, "gulpfile.js"))) {
  ChalkHelper.ChalkError(
    "path not found or does not contain gulpfile.js, exiting with code 1"
  );
  process.exit(1);
}
ChalkHelper.ChalkMessage("SPFx folder path");
ChalkHelper.ChalkMessage(path);

if (options.gitInit) {
  gitInitCommand(path);
}

if (options.npmVersion) {
  npmVersionCommand(resolve(path, "gulpfile.js"));
}

if (options.fastServe) {
  fastServeCommand(path);
}

if (options.sortPackage) {
  sortPackageCommand(resolve(path, "package.json"));
}
