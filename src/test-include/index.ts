import { apply, mergeWith, move, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';

import { templateInclude } from '../lib/include';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function(_options: any): Rule {
  return (_tree: Tree, context: SchematicContext) => {

    let source = url('files/main');

    let outputPath = _options.output || '.';

    let templateData = {
      title: _options.title
    }

    return mergeWith(
      apply(source, [
        templateInclude(context, templateData, './files/includes'),
        move(outputPath)
      ])
    );
  };
}
