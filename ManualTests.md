# Manual tests

- Run from command folder with full path to WebPart folder

  `node .\index.js -fs -nv -p C:\Users\basse\code\spfx-jack\testWPs\TestSoln\`

- Run from command folder with relative path to WebPart folder

  `node .\index.js -fs -nv -p .\testWPs\TestSoln\`

- Run from WebPart folder with no path

  `node ..\..\index.js -nv -fs`

- Run from WebPart folder with relative path .

  `node ..\..\index.js -nv -fs -p .`
