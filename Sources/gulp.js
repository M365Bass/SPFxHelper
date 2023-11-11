build.initialize(require("gulp"));

/* npm version */
const gulp = require("gulp");

gulp.task("version-sync", async function () {
  // import gulp utilities to write error messages
  const gutil = require("gulp-util");

  // import file system utilities form nodeJS
  const fs = require("fs");

  // read package.json
  var pkgConfig = require("./package.json");

  // read configuration of web part solution file
  var pkgSolution = require("./config/package-solution.json");

  // log old version
  gutil.log("Old Version:\t" + pkgSolution.solution.version);

  // Generate new MS compliant version number
  var newVersionNumber = pkgConfig.version.split("-")[0] + ".0";

  // assign newly generated version number to web part version
  pkgSolution.solution.version = newVersionNumber;

  // log new version
  gutil.log("New Version:\t" + pkgSolution.solution.version);

  // write changed package-solution file
  fs.writeFile(
    "./config/package-solution.json",
    JSON.stringify(pkgSolution, null, 4),
    () => {}
  );
});
/* end of npm version */
