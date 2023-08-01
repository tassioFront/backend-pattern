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
  NormalizedVueSchema,
  normalizeVueOptions,
} from '../shared';

import { ServiceGeneratorSchema } from './schema';

function updateTsConfig(tree: Tree, options: NormalizedSchema) {
  updateJson(tree, 'tsconfig.base.json', (json) => {
    const nxJson = readNxJson(tree);
    const c = json.compilerOptions;
    c.paths = c.paths || {};
    delete c.paths[options.name];
    c.paths[`@${nxJson.npmScope}/${options.projectName}`] = [
      `${options.projectRoot}/src/index.ts`,
    ];
    return json;
  });
}

export type NormalizedSchema = NormalizedVueSchema<ServiceGeneratorSchema>;

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: options.offsetPathFromRoot,
    offsetFromLibs: offsetFromRoot(options.projectRoot).replace('../', ''),
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export async function serviceGenerator(
  tree: Tree,
  schema: ServiceGeneratorSchema
) {
  const options = normalizeVueOptions(tree, schema);
  addProjectConfiguration(tree, options.projectName, {
    root: options.projectRoot,
    projectType: 'application',
    sourceRoot: `${options.projectRoot}/src`,
    targets: {
      ...defineTargetConfig(options),
    },
    tags: ['type:app', 'scope:' + options.name],
  });
  updateTsConfig(tree, options);
  addFiles(tree, options);
  return runTasksInSerial();
}

export const serviceSchematic = convertNxGenerator(serviceGenerator);
