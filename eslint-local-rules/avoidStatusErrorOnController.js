module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Regarding design definitions, 400 and 500 https errors should not be called at controllers. 400 must be called at routes and 500 is defined as a default error at main/index file.',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create: function (context) {
    const fileName = context.getFilename();
    if (fileName.includes('controller')) {
      return {
        Literal: function (node) {
          if (node.value === 400 || node.value === 500) {
            context.report({
              node,
              message:
                '400 and 500 https errors is not allowed at controllers. 400 must be called at routes (see the throwBadRequest helper) and 500 is defined as a default error at main/index file.',
            });
          }
        },
      };
    }
    return {};
  },
};
