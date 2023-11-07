const gitInitCommand = require("../Commands/gitInit");
const chalk = require("../Utils/chalk");

const cp = require("child_process");
const process = require("node:process");
const Buffer = require("node:buffer").Buffer;
const fs = require("fs");

test("gitInit: process.exit with 1 if execSync throws error", () => {
  const command = jest.spyOn(gitInitCommand, "gitInit");
  const execSync = jest.spyOn(cp, "execSync").mockImplementation(() => {
    throw new Error("any error");
  });
  const exit = jest.spyOn(process, "exit").mockImplementation(() => {});

  gitInitCommand.gitInit("any path");

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

  const gInit = gitInitCommand.gitInit("any path");

  expect(command).toHaveBeenCalled();
  expect(execSync).toHaveBeenCalledTimes(2);
  // execSync("git --version")
  // execSync("git status", { stdio: [] })
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
      else if (commandToRun === "git status") throw new Error("any error");
      else if (commandToRun === "git init -b main") Buffer.from("any output");
      // else if (commandToRun === "git init -b main") throw new Error("any error");
    });
  const chalkSuccess = jest.spyOn(chalk, "Success");
  const exit = jest.spyOn(process, "exit").mockImplementation(() => {});
  const chdir = jest.spyOn(process, "chdir").mockImplementation(() => {});

  const gInit = gitInitCommand.gitInit("any path");

  expect(command).toHaveBeenCalled();
  expect(execSync).toHaveBeenCalledTimes(3);
  // execSync("git --version")
  // execSync("git status", { stdio: [] })
  // execSync("git init -b main", { stdio: [] });
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
      else if (commandToRun === "git status") throw new Error("any error");
      else if (commandToRun === "git init -b main")
        throw new Error("any error");
    });
  const chalkSuccess = jest.spyOn(chalk, "Success");
  const chalkError = jest.spyOn(chalk, "Error");
  const exit = jest.spyOn(process, "exit").mockImplementation(() => {});
  const chdir = jest.spyOn(process, "chdir").mockImplementation(() => {});
  const writeFileSync = jest
    .spyOn(fs, "writeFileSync")
    .mockImplementation(() => {});

  const gInit = gitInitCommand.gitInit("any path");

  expect(command).toHaveBeenCalled();
  expect(execSync).toHaveBeenCalledTimes(3);
  // execSync("git --version")
  // execSync("git status", { stdio: [] })
  // execSync("git init -b main", { stdio: [] });
  expect(chdir).toHaveBeenCalled();
  expect(writeFileSync).toHaveBeenCalledWith("err.log", "any error");
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

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});
