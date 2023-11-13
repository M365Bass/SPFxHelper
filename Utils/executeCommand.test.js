const executeCommandUtil = require("./executeCommand");
const cp = require("child_process");
const fs = require("fs");
const chalk = require("../Utils/chalk");

test("executeCommand: return successfully", () => {
  const util = jest.spyOn(executeCommandUtil, "executeCommand");
  const execSync = jest.spyOn(cp, "execSync").mockImplementation(() => {
    return "success";
  });
  const chalkMessage = jest.spyOn(chalk, "Message");
  const chalkSuccess = jest.spyOn(chalk, "Success");

  util("ls");
  expect(util).toHaveBeenCalled();

  expect(chalkMessage).toHaveBeenCalled();
  expect(execSync).toHaveBeenCalled();
  expect(chalkSuccess).toHaveBeenCalled();
});

test("executeCommand: throw", () => {
  const util = jest.spyOn(executeCommandUtil, "executeCommand");
  const execSync = jest.spyOn(cp, "execSync").mockImplementation(() => {
    throw new Error(sharedLiterals.anyError);
  });
  const writeFileSync = jest
    .spyOn(fs, "writeFileSync")
    .mockImplementation(() => {});
  const chalkError = jest.spyOn(chalk, "Error");

  util("ls");
  expect(util).toHaveBeenCalled();

  expect(execSync).toThrow();
  expect(chalkError).toHaveBeenCalledTimes(2);
  expect(writeFileSync).toHaveBeenCalled();
});
