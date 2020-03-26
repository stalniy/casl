# [CASL Mongoose](https://stalniy.github.io/casl/) [![@casl/mongoose NPM version](https://badge.fury.io/js/%40casl%2Fmongoose.svg)](https://badge.fury.io/js/%40casl%2Fmongoose) [![](https://img.shields.io/npm/dm/%40casl%2Fmongoose.svg)](https://www.npmjs.com/package/%40casl%2Fmongoose) [![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

This package integrates [CASL] and [MongoDB]. In other words, it allows to fetch records based on CASL rules from MongoDB and answer questions like: "Which records can be read?" or "Which records can be updated?".

## Installation

```sh
npm install @casl/mongoose @casl/ability
# or
yarn add @casl/mongoose @casl/ability
# or
pnpm add @casl/mongoose @casl/ability
```

## Getting Started

This package provides `accessibleRecordsPlugin` and `accessibleFieldsPlugin` for [mongoose] ODM. Also it exposes `toMongoQuery` helper that allows to construct MongoDB query from `Ability` instance and use it with any MongoDB library (e.g., [native mongodb adapter][mongo-adapter]).

See [documentation](https://stalniy.github.io/casl/en/package/casl-mongoose) for more details.

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: /CONTRIBUTING.md
[mongoose]: http://mongoosejs.com/
[mongo-adapter]: https://mongodb.github.io/node-mongodb-native/
[CASL]: https://github.com/stalniy/casl
[MongoDB]: https://www.mongodb.com/
