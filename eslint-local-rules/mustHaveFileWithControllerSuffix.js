const fs = require('fs');
const path = require('path');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'The guideline requires a file with controller suffix (serviceName.controller.ts) at each app',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create: function (context) {
    const currentDir = path.dirname(context.getFilename());
    if (currentDir.includes('/apps/') && currentDir.includes('/src')) {
      const files = fs.readdirSync(currentDir);
      let hasControllerFile = false;

      for (const file of files) {
        hasControllerFile = file.endsWith('.controller.ts');

        if (hasControllerFile) {
          break;
        }
      }

      if (!hasControllerFile) {
        context.report({
          loc: { line: 1, column: 0 },
          message:
            'A serviceName.controller.ts files is required for each app.',
        });
      }
    }

    // Não é necessário aplicar a regra em outros diretórios
    return {};
  },
};
