const PACKAGE_NAME = process.env.LERNA_PACKAGE_NAME || process.env.npm_package_name

module.exports = {
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github'
  ],
  prepare: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    { path: '@semantic-release/git', message: `chore(release): ${PACKAGE_NAME}@\${nextRelease.version} [skip ci]` }
  ],
  tagFormat: `${PACKAGE_NAME}@\${version}`
}
