const PACKAGE_NAME = process.env.LERNA_PACKAGE_NAME || process.env.npm_package_name

module.exports = {
  verifyConditions: [
    '@semantic-release/git',
    '@semantic-release/github',
    '@semantic-release/npm',
    '@semantic-release/changelog'
  ],
  prepare: [
    { path: '@semantic-release/git', message: `chore(release): ${PACKAGE_NAME}@\${nextRelease.version} [skip ci]` },
    '@semantic-release/changelog',
    '@semantic-release/npm'
  ],
  tagFormat: `${PACKAGE_NAME}@\${version}`
}
