const fastServeCommand = require("./fastServe");
const chalk = require("../Utils/chalk");
const sharedLiterals = require("../Sources/testLiterals").shared;

const fs = require("fs");
const cp = require("child_process");

beforeEach(() => {
  command = jest.spyOn(fastServeCommand, "fastServe");
  chdir = jest.spyOn(process, "chdir").mockImplementation(() => {});
  chalkMessage = jest.spyOn(chalk, "Message");
  chalkWarning = jest.spyOn(chalk, "Warning");
  chalkSuccess = jest.spyOn(chalk, "Success");
});

test("fastServe: needs to be installed globally & needs to be configured in project", () => {
  const existsSync = jest.spyOn(fs, "existsSync").mockImplementation(() => {
    return !true;
  });
  const execSync = jest
    .spyOn(cp, "execSync")
    .mockImplementation((commandToRun) => {
      if (commandToRun === "npm list -g --depth=0")
        return Buffer.from("NOT spfx DASH fast-serve"); //spfx-fast-serve not present
    });

  fastServeCommand.fastServe(sharedLiterals.anyPath);
  expect(command).toHaveBeenCalled();

  expect(existsSync).toHaveBeenCalled();
  expect(chdir).toHaveBeenCalled();
  expect(chalkMessage).toHaveBeenCalledWith("Running spfx-fast-serve");
  expect(chalkSuccess).toHaveBeenCalledWith("spfx-fast-serve config completed");

  expect(execSync).toHaveBeenCalledTimes(1);
  // execSync("spfx-fast-serve");
});

test("fastServe: already installed globally but needs to be configured in project", () => {
  const existsSync = jest.spyOn(fs, "existsSync").mockImplementation(() => {
    return !true;
  });
  const execSync = jest
    .spyOn(cp, "execSync")
    .mockImplementation((commandToRun) => {
      if (commandToRun === "npm list -g --depth=0")
        return Buffer.from("spfx-fast-serve");
    });

  fastServeCommand.fastServe(sharedLiterals.anyPath);
  expect(command).toHaveBeenCalled();

  expect(existsSync).toHaveBeenCalled();
  expect(chdir).toHaveBeenCalled();
  expect(chalkMessage).toHaveBeenCalledWith("Running spfx-fast-serve");
  expect(chalkSuccess).toHaveBeenCalledWith("spfx-fast-serve config completed");

  expect(execSync).toHaveBeenCalledTimes(1);
  // execSync("spfx-fast-serve");
});

test("fastServe: already configured in project (meaning should be installed globally)", () => {
  const existsSync = jest.spyOn(fs, "existsSync").mockImplementation(() => {
    return true;
  });
  const execSync = jest.spyOn(cp, "execSync");

  fastServeCommand.fastServe(sharedLiterals.anyPath);
  expect(command).toHaveBeenCalled();

  expect(existsSync).toHaveBeenCalled();
  expect(chalkWarning).toHaveBeenCalledWith(
    "spfx-fast-serve already configured"
  );
  expect(execSync).not.toHaveBeenCalled();
});

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});
