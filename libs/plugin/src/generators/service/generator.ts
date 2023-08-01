import * as path from 'path';

import {
  addProjectConfiguration,
  convertNxGenerator,
  generateFiles,
  names,
  offsetFromRoot,
  readNxJson,
  Tree,
  runTasksInSerial,
  updateJson,
} from '@nrwl/devkit';

import {
  defineTargetConfig,
  NormalizedServiceSchema,
  normalizeServiceOptions,
  defineModelTargetConfig,
  normalizeModelOptions,
} from '../shared';

import { ServiceGeneratorSchema } from './schema';

function updateTsConfig(
  tree: Tree,
  options: NormalizedSchema,
  alternativeNameSpace?: string
) {
  updateJson(tree, 'tsconfig.base.json', (json) => {
    const nxJson = readNxJson(tree);
    const c = json.compilerOptions;
    c.paths = c.paths || {};
    delete c.paths[options.name];
    c.paths[
      `@${nxJson.npmScope}/${
        alternativeNameSpace ? alternativeNameSpace : options.projectName
      }`
    ] = [`${options.projectRoot}/src/index.ts`];
    return json;
  });
}

export type NormalizedSchema = NormalizedServiceSchema<ServiceGeneratorSchema>;

function addFiles(tree: Tree, options: NormalizedSchema, dirContext: string) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: options.offsetPathFromRoot,
    offsetFromLibs: offsetFromRoot(options.projectRoot).replace('../', ''),
  };

  generateFiles(
    tree,
    path.join(__dirname, dirContext),
    options.projectRoot,
    templateOptions
  );
}

export async function serviceGenerator(
  tree: Tree,
  schema: ServiceGeneratorSchema
) {
  const options = normalizeServiceOptions(tree, schema);
  const modelOptions = normalizeModelOptions(tree, schema);
  // define app config
  addProjectConfiguration(tree, options.projectName, {
    root: options.projectRoot,
    projectType: 'application',
    sourceRoot: `${options.projectRoot}/src`,
    targets: {
      ...defineTargetConfig(options),
    },
    tags: ['type:app', 'scope:' + options.name],
  });
  // define lib config
  addProjectConfiguration(tree, options.projectName, {
    root: modelOptions.projectRoot,
    projectType: 'library',
    targets: {
      ...defineModelTargetConfig(modelOptions),
    },
    sourceRoot: `${modelOptions.projectRoot}/src`,
    tags: ['type:db-model', 'scope:' + options.name],
  });

  // define app ts config
  updateTsConfig(tree, options);
  // define lib ts config
  updateTsConfig(tree, modelOptions, 'models/' + modelOptions.projectName);

  // define app files
  addFiles(tree, options, 'files/app');
  // define model config
  addFiles(tree, modelOptions, 'files/lib');
  return runTasksInSerial();
}

export const serviceSchematic = convertNxGenerator(serviceGenerator);
