# Schematics demo

This repository is a basic Schematic demo implementation.

## Demos

### Template Include

- [./src/lib/include.ts](./src/lib/include.ts) contains template include function. This function can be used in a template: `<%= include('myfiletoinclude') %>` or with template data override: `<%= include('myfiletoinclude', {mykey: 'myValue'}) %>`
- [./src/test-include/index.ts](./src/test-include/index.ts) demonstrate how to use `include` function

## Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.


 