const avoidStatusError = require('./avoidStatusErrorOnController');
const mustHaveFileWithControllerSuffix = require('./mustHaveFileWithControllerSuffix');

module.exports = {
  'avoid-status-error-on-controller': avoidStatusError,
  'must-have-file-with-controller-suffix': mustHaveFileWithControllerSuffix,
};
