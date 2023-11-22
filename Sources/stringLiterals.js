exports.npmVersion = {
  replaceInFile: {
    messages: {
      initialMessage: "Add npmVersion script",
      successMessage: "gulpfile updated with npmVersion script",
      warningMessage: "gulpfile already contains npmVersion script"
    },
    source: `build.initialize(require("gulp"));`,
    checkString: `/* npm version */`
  },
  appendToJSONFile: {
    messages: {
      initialMessage: "Add postinstall script to package.JSON",
      successMessage: "SUCCESS",
      errorMessage: "ERR"
    },
    jsonContainer: "scripts",
    jsonKey: "postversion",
    jsonValue: "gulp version-sync && git add . && git commit --amend --no-edit"
  }
};
