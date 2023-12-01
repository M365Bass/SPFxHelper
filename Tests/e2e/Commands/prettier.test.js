/* eslint-env jest */
/*global
parentWP_beforeChanges:writeable,
componentWP_beforeChanges:writeable,
parentWP_afterChanges:writeable,
componentWP_afterChanges:writeable,
*/

const fs = require("fs");
const join = require("path").join;
const wpFolderPath = require("../../../Utils/folderPaths").wpFolderPath();
const parentFolderPath =
  require("../../../Utils/folderPaths").parentFolderPath();
const runPrettierCommand = require("../../../Commands/runPrettier");

const parentWP_filePath = join(
  wpFolderPath,
  "src",
  "webparts",
  "webPart1",
  "components",
  "WebPart1.tsx"
);

const componentWP_filePath = join(
  wpFolderPath,
  "src",
  "webparts",
  "webPart1",
  "WebPart1WebPart.ts"
);

beforeAll(() => {
  parentWP_beforeChanges = fs.readFileSync(parentWP_filePath, "utf8");
  componentWP_beforeChanges = fs.readFileSync(componentWP_filePath, "utf8");

  runPrettierCommand.runPrettier(parentFolderPath);

  parentWP_afterChanges = fs.readFileSync(parentWP_filePath, "utf8");
  componentWP_afterChanges = fs.readFileSync(componentWP_filePath, "utf8");
});

test("prettier: parentWP & componentWP files changed", () => {
  expect(parentWP_afterChanges).not.toEqual(parentWP_beforeChanges);
  expect(componentWP_afterChanges).not.toEqual(componentWP_beforeChanges);
});
