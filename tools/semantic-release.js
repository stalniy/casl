const PACKAGE_NAME = process.env.LERNA_PACKAGE_NAME || process.env.npm_package_name

module.exports = {
  tagFormat: `${PACKAGE_NAME}@\${version}`,
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github'
  ],
  prepare: [
    {
      path: '@semantic-release/changelog',
      changelogTitle: '# Change Log\n\nAll notable changes to this project will be documented in this file.'
    },
    '@semantic-release/npm',
    {
      path: '@semantic-release/git',
      message: `chore(release): ${PACKAGE_NAME}@\${nextRelease.version} [skip ci]`
    }
  ]
}
