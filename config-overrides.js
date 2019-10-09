const {useBabelRc, override} = require('customize-cra');

// eslint-disable-next-line fp/no-mutation
module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
);
