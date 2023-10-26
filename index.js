#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const resolve = require("path").resolve;
const ChalkHelper = require("./Utils/ChalkHelper");
const npmVersionCommand = require("./Commands/npmVersion");
const fastServeCommand = require("./Commands/fastServe");
const gitInitCommand = require("./Commands/gitInit");

const program = new Command();

program
  .version("0.0.1")
  .description("An example CLI for managing a directory")
  .option("-p, --path <value>", "path")
  .option("-nv, --npm-version", "NPM version")
  .option("-fs, --fast-serve", "Fast Serve")
  .option("-gi, --git-init", "git init")
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
ChalkHelper.ChalkMessage("SPFx folder path with gulpfile.js");
ChalkHelper.ChalkMessage(path);

if (options.npmVersion) {
  const pathWithGulpFileJS = resolve(path, "gulpfile.js");
  npmVersionCommand(pathWithGulpFileJS);
}

if (options.fastServe) {
  fastServeCommand(path);
}

if (options.gitInit) {
  gitInitCommand(path);
}
