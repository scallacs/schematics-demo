import { SchematicContext, template, Tree, SchematicsException, url, applyContentTemplate } from "@angular-devkit/schematics";
import { basename, dirname } from "path";

type IncludeFct = (path: string) => string;

interface IncludeContext {
    includeBaseDirectory?: string,
    context: SchematicContext,
    include: IncludeFct,
    data: any
}

export function templateInclude(context: SchematicContext, data: any, includeBaseDirectory?: string) {
    let includeContext: Partial<IncludeContext> = {
        context: context,
        includeBaseDirectory: includeBaseDirectory
    };
    let includeFct: IncludeFct = include.bind(includeContext);
    includeContext.include = includeFct;
    includeContext.data = data;
    if (!('include' in data)) {
        data.include = includeFct;
    }
    return template(data).bind(includeContext);
}


export function include(this: IncludeContext, filepath: string, templateData: any = this.data) {
    let directory = this.includeBaseDirectory || dirname(filepath);
    let filename = this.includeBaseDirectory ? filepath : basename(filepath);
    const source = url(directory);
    let tree: Tree = source(this.context) as Tree;
    if (!tree.exists(filename)) {
        throw new SchematicsException(
            `Please create template file "${filename}" in "${directory}"`
        )
    }
    let result = applyContentTemplate(templateData)(tree.get(filename)!);
    if (!result) {
        throw new SchematicsException(
            `internal error: applyContentTemplate() function returned null.`
        )
    }
    let fileContent = result.content.toString();
    return fileContent;
}