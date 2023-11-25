/* eslint-env jest */
/*global
initialMessage:writable,
JSONFilePath:writable,
jsonKey:writable,
jsonValue:writable,
successMessage:writable,
errorMessage:writable,
util:writable,
readFileSync:writable,
chalkMessage:writable,
chalkSuccess:writable,
chalkError:writable,
*/

const appendToJSONFileUtil = require("./appendToJSONFile");
const chalk = require("./chalk");
const sharedLiterals = require("../Sources/testLiterals").shared;
const appendToJSONFileLiterals =
  require("../Sources/testLiterals").appendToJSONFile;

const fs = require("fs");

beforeEach(() => {
  initialMessage = "initialMessage";
  JSONFilePath = sharedLiterals.anyPath;
  // jsonContainer
  jsonKey = "jsonKeyToAppend";
  jsonValue = "jsonValueToAppend";
  successMessage = "successMessage";
  errorMessage = "errorMessage";

  util = jest.spyOn(appendToJSONFileUtil, "appendToJSONFile");
  readFileSync = jest.spyOn(fs, "readFileSync").mockImplementation(() => {
    return JSON.stringify(appendToJSONFileLiterals.testJSON);
  });

  chalkMessage = jest.spyOn(chalk, "Message");
  chalkSuccess = jest.spyOn(chalk, "Success");
  chalkError = jest.spyOn(chalk, "Error");
});

test("appendToJSONFile: append successful", () => {
  const jsonContainer = appendToJSONFileLiterals.containerToFind;

  const writeFileSync = jest
    .spyOn(fs, "writeFileSync")
    .mockImplementation(() => {});

  appendToJSONFileUtil.appendToJSONFile(
    initialMessage,
    JSONFilePath,
    jsonContainer,
    jsonKey,
    jsonValue,
    successMessage,
    errorMessage
  );
  expect(util).toHaveBeenCalled();

  expect(chalkMessage).toHaveBeenCalledWith(initialMessage);
  expect(readFileSync).toHaveBeenCalled();
  expect(writeFileSync).toHaveBeenCalled();
  expect(chalkSuccess).toHaveBeenCalledWith(successMessage);
  expect(chalkError).not.toHaveBeenCalled();
});

test("appendToJSONFile: append failed: container not found", () => {
  const jsonContainer = appendToJSONFileLiterals.containerToNotFind;

  const writeFileSync = jest
    .spyOn(fs, "writeFileSync")
    .mockImplementation((path) => {
      expect(path).toBe("err.log");
    });

  appendToJSONFileUtil.appendToJSONFile(
    initialMessage,
    JSONFilePath,
    jsonContainer,
    jsonKey,
    jsonValue,
    successMessage,
    errorMessage
  );
  expect(util).toHaveBeenCalled();

  expect(chalkMessage).toHaveBeenCalledWith(initialMessage);
  expect(readFileSync).toHaveBeenCalled();
  expect(writeFileSync).toThrow();
  expect(writeFileSync).toHaveBeenCalledTimes(2);
  // fs.writeFileSync(JSONFilePath, JSON.stringify(JSONcontents));
  // fs.writeFileSync("err.log", error.message);
  expect(chalkError).toHaveBeenCalledTimes(2);
  // chalk.Error(errorMessage);
  // chalk.Error("Error details logged to err.log in " + process.cwd());
  expect(chalkError).toHaveBeenCalledWith(errorMessage);
  expect(chalkError).toHaveBeenCalledWith(
    "Error details logged to err.log in " + process.cwd()
  );
  expect(chalkSuccess).not.toHaveBeenCalled();
});

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});
