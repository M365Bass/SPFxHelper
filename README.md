# SPFxHelper

Helper to automate steps after initialising a new SPFx project

# Manual tests

- Run from SPFxHelper with full path to WebPart folder

  `node .\index.js -fs -nv -p C:\Users\basse\code\SPFxHelper\testWPs\TestSoln\`

- Run from SPFxHelper with relative path to WebPart folder

  `node .\index.js -fs -nv -p .\testWPs\TestSoln\`

- Run from WebPart folder with no path

  `node ..\..\index.js -nv -fs`

- Run from WebPart folder with relative path .

  `node ..\..\index.js -nv -fs -p .`
