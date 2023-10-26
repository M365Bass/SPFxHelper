const os = require("os");
const join = require("path").join;

exports.parentFolderPath = function () {
  return join(os.homedir(), "spfx-jack-testing").toString();
};

exports.wpFolderPath = function () {
  return join(this.parentFolderPath(), "VanillaSolution").toString();
};
