# SPFxHelper

Helper to automate steps after initialising a new SPFx project

# Task list

- [x] Use only one path from runner and massage to match exactly what's needed in scripts
  - [x] path to gulpfile.js for 1PkgVer
  - [x] path to solution folder for 2FastServe
- [ ] Add figlet and relevant tracing information
  - [ ] 1PkgVer has two steps: update gulpfile.js and npx prettier
  - [ ] 2FastServe also has two steps: install spfx-fast-serve globally if not installed and configure spfx-fast-serve
- [ ] Add single step for npx prettier at the end
- [ ] Add step to git init if not already a git repo
