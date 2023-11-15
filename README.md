[![Merge checks](https://github.com/M365Bass/spfx-jack/actions/workflows/pull_request.yml/badge.svg)](https://github.com/M365Bass/spfx-jack/actions/workflows/pull_request.yml)

# SPFx Jack <img src="https://github.com/M365Bass/spfx-jack/assets/11630074/82afb455-5331-498d-b5c9-86fc0a89b7fb" width="28">

Helper to automate steps after initialising a new SPFx project. Current features:

1. **Run SPFx serve command as fast as possible** using [SPFx Fast Serve](https://github.com/s-KaiNet/spfx-fast-serve) by Sergei Sergeev
2. **Automatically align SharePoint version number to npm's** by updating version number in SPFx package-solution file after running [npm version](https://docs.npmjs.com/cli/v8/commands/npm-version). I use my own script [Sync Version](https://m365bass.github.io/posts/2021-05-19.html) adapted from [Stefan Bauer](https://n8d.at/how-to-version-new-sharepoint-framework-projects) and [Hugo Bernier](https://tahoeninja.blog/posts/display-the-solution-version-in-your-web-part/).
3. **Create git commits** when git is installed. This ensures transparency as to what was done using spfx-jack.
4. **Format all files** using [Prettier](https://prettier.io/docs/en/cli.html) to create a well-formatted solution baseline. This is because when using format on save, changes made to a file for the first time also create many changes related to formatting. By formatting the solution ahead, we ensure any subsequent changes are easier to review.
5. **Sort entries in package.json file** for better readibility using [sort-package-json](https://github.com/keithamus/sort-package-json)

# Motivation

I built this as I repeatedly do these things every time I start a new project. The goal is to have as many "independent" commands as needed.
