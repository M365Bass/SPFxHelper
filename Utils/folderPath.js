const os = require("os");
const join = require("path").join;

exports.folderPath = function () {
  return join(os.homedir(), "spfx-jack-testing").toString();
};
