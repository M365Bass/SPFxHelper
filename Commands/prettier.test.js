const fs = require("fs");
const join = require("path").join;
const wpFolderPath = require("../Utils/folderPaths").wpFolderPath();
const parentFolderPath = require("../Utils/folderPaths").parentFolderPath();
const prettierCommand = require("./prettier");

const parentWP_filePath = join(
  wpFolderPath,
  "src",
  "webparts",
  "WebPart1",
  "components",
  "WebPart1.tsx"
);
const componentWP_filePath = join(
  wpFolderPath,
  "src",
  "webparts",
  "WebPart1",
  "WebPart1WebPart.ts"
);

beforeEach(() => {
  parentWP_beforeChanges = fs.readFileSync(parentWP_filePath, "utf8");
  componentWP_beforeChanges = fs.readFileSync(componentWP_filePath, "utf8");

  prettierCommand(parentFolderPath);

  parentWP_afterChanges = fs.readFileSync(parentWP_filePath, "utf8");
  componentWP_afterChanges = fs.readFileSync(componentWP_filePath, "utf8");
});

test("Files changed after prettier ran", () => {
  expect(parentWP_afterChanges).not.toEqual(parentWP_beforeChanges);
  expect(componentWP_afterChanges).not.toEqual(componentWP_beforeChanges);
});
