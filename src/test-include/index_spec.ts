import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('test-include', () => {
  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('test-include', {
      output: 'test',
      title: 'Hello World!'
    }, Tree.empty());

    expect(tree.files).toEqual([
      '/test/index.html'
    ]);

    expect(tree.readContent('/test/index.html').toString()).toEqual('\
<h2>Hello World!</h2>\r\n\
<h3>This demonstrates include function with recursivity!!!</h3>\
')
  });
});
