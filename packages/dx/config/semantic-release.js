const parser = require('git-log-parser'); // eslint-disable-line

// this is hack which allows to use semantic-release for monorepo
// https://github.com/semantic-release/semantic-release/issues/193#issuecomment-578436666
parser.parse = (parse => (config, options) => {
  if (Array.isArray(config._)) {
    config._.push(options.cwd);
  } else if (config._) {
    config._ = [config._, options.cwd];
  } else {
    config._ = options.cwd;
  }
  return parse(config, options);
})(parser.parse);

module.exports = {
  tagFormat: `${process.env.npm_package_name}@\${version}`,
  branches: [
    'master',
    { name: 'next', channel: 'next', prerelease: true },
    { name: 'alpha', channel: 'alpha', prerelease: true },
    `${process.env.npm_package_name}@+([0-9])?(.{+([0-9]),x}).x`
  ],
  plugins: [
    ['@semantic-release/commit-analyzer', {
      releaseRules: [
        { type: 'chore', scope: 'deps', release: 'patch' },
        { type: 'docs', scope: 'README', release: 'patch' },
        { type: 'refactor', release: 'patch' },
      ]
    }],
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      changelogTitle: '# Change Log\n\nAll notable changes to this project will be documented in this file.'
    }],
    '@semantic-release/npm',
    ['@semantic-release/git', {
      message: `chore(release): ${process.env.npm_package_name}@\${nextRelease.version} [skip ci]`
    }],
    ["@semantic-release/github", {
      releasedLabels: false,
      successComment: false,
    }]
  ],
};
