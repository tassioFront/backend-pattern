module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Regarding design definitions, 400 http error should not be called at controllers. Only route files',
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
          if (node.value === 400) {
            context.report({
              node,
              message:
                '400 http error is not allowed at controllers, it should be treated at routers.',
            });
          }
        },
      };
    }
    return {};
  },
};
