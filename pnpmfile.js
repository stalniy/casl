// TODO: remove this when https://github.com/iamturns/eslint-config-airbnb-typescript/issues/6 fixed
function readPackage(pkg) {
  if (pkg.name === 'eslint-config-airbnb-typescript') {
    const { 'eslint-config-airbnb': airbnb, ...dependencies } = pkg.dependencies;
    pkg.dependencies = dependencies;
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
