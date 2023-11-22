/* eslint-env jest */

const replaceInFileUtil = require("./replaceInFile");
const prettifyPathUtil = require("./prettifyPath");

const fs = require("fs");
const chalk = require("./chalk");

beforeEach(() => {
  baseFileContents = "1234";
  replaceThis = "23";
  withThis = "56";
  result = "1564";
});

test("replaceInFile: check string already exists", () => {
  const util = jest.spyOn(replaceInFileUtil, "replaceInFile");
  const ppUtil = jest
    .spyOn(prettifyPathUtil, "prettifyPath")
    .mockImplementation(() => {});

  const readFileSync = jest.spyOn(fs, "readFileSync").mockImplementation(() => {
    return baseFileContents;
  });

  const chalkMessage = jest.spyOn(chalk, "Message");
  const chalkWarning = jest.spyOn(chalk, "Warning");

  util(
    "initialMessage",
    "temp_file.json",
    "ANY", // replace this
    "ANY", //with this
    baseFileContents, //check string (should exist after, if exists before, it skips replace)
    "successMessage",
    "warningMessage"
  );
  expect(util).toHaveBeenCalled();

  expect(chalkMessage).toHaveBeenCalledWith("initialMessage");
  expect(ppUtil).toHaveBeenCalled();
  expect(readFileSync).toHaveBeenCalled();
  expect(readFileSync).toHaveReturnedWith(baseFileContents);
  expect(chalkWarning).toHaveBeenCalledWith("warningMessage");
});

test("replaceInFile: replace 23 with 56", () => {
  const util = jest.spyOn(replaceInFileUtil, "replaceInFile");
  const ppUtil = jest
    .spyOn(prettifyPathUtil, "prettifyPath")
    .mockImplementation(() => {});
  const readFileSync = jest.spyOn(fs, "readFileSync").mockImplementation(() => {
    return baseFileContents;
  });
  const writeFileSync = jest
    .spyOn(fs, "writeFileSync")
    .mockImplementation(() => {
      return result;
    });

  const chalkMessage = jest.spyOn(chalk, "Message");
  const chalkSuccess = jest.spyOn(chalk, "Success");

  util(
    "initialMessage",
    "temp_file.json",
    replaceThis, // replace this
    withThis, //with this
    withThis, //check string (should exist after, if exists before, it skips replace)
    "successMessage",
    "warningMessage"
  );
  expect(util).toHaveBeenCalled();

  expect(chalkMessage).toHaveBeenCalledWith("initialMessage");
  expect(ppUtil).toHaveBeenCalled();
  expect(readFileSync).toHaveBeenCalled();
  expect(readFileSync).toHaveReturnedWith(baseFileContents);
  expect(writeFileSync).toHaveBeenCalled();
  expect(writeFileSync).toHaveReturnedWith(result);
  expect(chalkSuccess).toHaveBeenCalledWith("successMessage");
});

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});
