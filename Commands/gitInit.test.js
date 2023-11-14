const gitInitCommand = require("./gitInit");
const chalk = require("../Utils/chalk");
const sharedLiterals = require("../Sources/testLiterals").shared;

const cp = require("child_process");
const process = require("node:process");
const Buffer = require("node:buffer").Buffer;
const fs = require("fs");

test("gitInit: process.exit with 1 if execSync throws error", () => {
  const command = jest.spyOn(gitInitCommand, "gitInit");
  const execSync = jest.spyOn(cp, "execSync").mockImplementation(() => {
    throw new Error(sharedLiterals.anyError);
  });
  const exit = jest.spyOn(process, "exit").mockImplementation(() => {});

  gitInitCommand.gitInit(sharedLiterals.anyPath);

  expect(command).toHaveBeenCalled();
  expect(execSync).toHaveBeenCalled();
  expect(exit).toHaveBeenCalledWith(1);
});

test("gitInit: git already initialised", () => {
  const command = jest.spyOn(gitInitCommand, "gitInit");
  const execSync = jest
    .spyOn(cp, "execSync")
    .mockImplementation((commandToRun) => {
      if (commandToRun === "git --version") return Buffer.from("git version");
      else if (commandToRun === "git status") return Buffer.from("On branch");
    });
  const chalkSuccess = jest.spyOn(chalk, "Success");
  const chalkWarning = jest.spyOn(chalk, "Warning");
  const exit = jest.spyOn(process, "exit").mockImplementation(() => {});
  const chdir = jest.spyOn(process, "chdir").mockImplementation(() => {});

  const gInit = gitInitCommand.gitInit(sharedLiterals.anyPath);

  expect(command).toHaveBeenCalled();
  expect(execSync).toHaveBeenCalledTimes(2);
  // execSync("git --version")
  // execSync("git status")
  expect(chdir).toHaveBeenCalled();
  expect(exit).not.toHaveBeenCalled();

  expect(chalkWarning).toHaveBeenCalledWith("git already initialised");
  expect(chalkSuccess).toHaveBeenCalledWith("git installed");

  expect(gInit).toBe(true);
});

test("gitInit: git needs initialisation & succeeds", () => {
  const command = jest.spyOn(gitInitCommand, "gitInit");
  const execSync = jest
    .spyOn(cp, "execSync")
    .mockImplementation((commandToRun) => {
      if (commandToRun === "git --version") return Buffer.from("git version");
      else if (commandToRun === "git status")
        throw new Error(sharedLiterals.anyError);
      else if (commandToRun === "git init -b main") Buffer.from("any output");
      // else if (commandToRun === "git init -b main") throw new Error(sharedLiterals.anyError);
    });
  const chalkSuccess = jest.spyOn(chalk, "Success");
  const exit = jest.spyOn(process, "exit").mockImplementation(() => {});
  const chdir = jest.spyOn(process, "chdir").mockImplementation(() => {});

  const gInit = gitInitCommand.gitInit(sharedLiterals.anyPath);

  expect(command).toHaveBeenCalled();
  expect(execSync).toHaveBeenCalledTimes(3);
  // execSync("git --version")
  // execSync("git status")
  // execSync("git init -b main");
  expect(chdir).toHaveBeenCalled();
  expect(exit).not.toHaveBeenCalled();

  expect(chalkSuccess).toHaveBeenCalledWith("git installed");
  expect(chalkSuccess).toHaveBeenCalledWith("git initialisation completed");

  expect(gInit).toBe(true);
});

test("gitInit: git needs initialisation & fails", () => {
  const command = jest.spyOn(gitInitCommand, "gitInit");
  const execSync = jest
    .spyOn(cp, "execSync")
    .mockImplementation((commandToRun) => {
      if (commandToRun === "git --version") return Buffer.from("git version");
      else if (commandToRun === "git status")
        throw new Error(sharedLiterals.anyError);
      else if (commandToRun === "git init -b main")
        throw new Error(sharedLiterals.anyError);
    });
  const chalkSuccess = jest.spyOn(chalk, "Success");
  const chalkError = jest.spyOn(chalk, "Error");
  const exit = jest.spyOn(process, "exit").mockImplementation(() => {});
  const chdir = jest.spyOn(process, "chdir").mockImplementation(() => {});
  const writeFileSync = jest
    .spyOn(fs, "writeFileSync")
    .mockImplementation(() => {});

  const gInit = gitInitCommand.gitInit(sharedLiterals.anyPath);

  expect(command).toHaveBeenCalled();
  expect(execSync).toHaveBeenCalledTimes(3);
  // execSync("git --version")
  // execSync("git status")
  // execSync("git init -b main");
  expect(chdir).toHaveBeenCalled();
  expect(writeFileSync).toHaveBeenCalledWith(
    "err.log",
    sharedLiterals.anyError
  );
  expect(exit).not.toHaveBeenCalled();

  expect(chalkSuccess).toHaveBeenCalled();
  expect(chalkSuccess).toHaveBeenCalledWith("git installed");
  expect(chalkError).toHaveBeenCalledTimes(2);
  expect(chalkError).toHaveBeenCalledWith("git was not initialised");
  expect(chalkError).toHaveBeenCalledWith(
    "Error details logged to err.log in " + process.cwd()
  );

  expect(gInit).toBe(true);
});

test("gitInit: git does not return a version", () => {
  const command = jest.spyOn(gitInitCommand, "gitInit");
  const execSync = jest.spyOn(cp, "execSync").mockImplementation(() => {
    return Buffer.from("anything but git version");
  });

  gitInitCommand.gitInit(sharedLiterals.anyPath);
  expect(command).toHaveBeenCalled();

  expect(execSync).not.toHaveReturnedWith(Buffer.from("git version"));
});

test("gitInit: git does not return a status", () => {
  const command = jest.spyOn(gitInitCommand, "gitInit");
  const execSync = jest
    .spyOn(cp, "execSync")
    .mockImplementation((commandToRun) => {
      if (commandToRun === "git --version") return Buffer.from("git version");
      else if (commandToRun === "git status")
        return Buffer.from("anything but On branch");
    });
  const chdir = jest.spyOn(process, "chdir").mockImplementation(() => {});

  gitInitCommand.gitInit(sharedLiterals.anyPath);
  expect(command).toHaveBeenCalled();

  expect(execSync).toHaveBeenCalledTimes(2);
  expect(execSync).toHaveReturnedWith(Buffer.from("git version"));
  expect(chdir).toHaveBeenCalled();
  expect(execSync).not.toHaveReturnedWith(Buffer.from("On branch"));
});

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});
