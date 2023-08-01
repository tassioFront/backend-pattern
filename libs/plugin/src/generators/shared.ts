import { getWorkspaceLayout, names, Tree, offsetFromRoot } from '@nrwl/devkit';

import { ServiceGeneratorSchema } from './library-vue/schema';

export type NormalizedVueSchema<T> = {
  name: string;
  projectName: string;
  projectRoot: string;
  offsetPathFromRoot: string;
  projectDirectory: string;
} & T;

export function normalizeVueOptions<T extends ServiceGeneratorSchema>(
  tree: Tree,
  schema: T
): NormalizedVueSchema<T> {
  const name = names(schema.name).fileName;
  const projectDirectory = schema.directory
    ? `${names(schema.directory).fileName}/${name}`
    : name;
  const dir = 'appsDir';
  const projectName = name;
  const projectRoot = `${getWorkspaceLayout(tree)[dir]}/${projectDirectory}`;

  const offsetPathFromRoot = offsetFromRoot(projectRoot);
  return {
    ...schema,
    name,
    projectName,
    projectRoot,
    projectDirectory,
    offsetPathFromRoot,
  };
}

export function defineTargetConfig(
  options: NormalizedVueSchema<ServiceGeneratorSchema>
) {
  return {
    build: {
      executor: '@nx/webpack:webpack',
      outputs: ['{options.outputPath}'],
      defaultConfiguration: 'production',
      options: {
        outputFileName: 'index.js',
        target: 'node',
        compiler: 'tsc',
        outputPath: `dist/${options.projectRoot}`,
        main: `${options.projectRoot}/src/index.ts`,
        tsConfig: `${options.projectRoot}/tsconfig.app.json`,
        isolatedConfig: true,
        webpackConfig: `${options.projectRoot}/webpack.config.js`,
      },
      configurations: {
        development: {},
        production: {},
      },
    },
    serve: {
      executor: '@nx/js:node',
      defaultConfiguration: 'development',
      options: {
        buildTarget: `${options.projectName}:build`,
      },
      configurations: {
        development: {
          buildTarget: `${options.projectName}:build:development`,
        },
        production: {
          buildTarget: `${options.projectName}:build:production`,
        },
      },
    },
    lint: {
      executor: '@nx/linter:eslint',
      outputs: ['{options.outputFile}'],
      options: {
        lintFilePatterns: [`apps/${options.projectName}/**/*.ts`],
      },
    },
    test: {
      executor: '@nx/jest:jest',
      outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
      options: {
        jestConfig: `${options.projectRoot}/jest.config.ts`,
        passWithNoTests: true,
      },
      configurations: {
        ci: {
          ci: true,
          codeCoverage: true,
        },
      },
    },
  };
}
