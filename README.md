# CASL

[![NPM version](https://badge.fury.io/js/casl.svg)](http://badge.fury.io/js/casl)
[![Build Status](https://travis-ci.org/stalniy/casl.svg?branch=master)](https://travis-ci.org/stalniy/casl)
![downloads](https://img.shields.io/github/downloads/stalniy/casl/total.svg)

CASL is an isomorphic authorization JavaScript library which restricts what resources a given user is allowed to access. All permissions are defined in a single location (the `Ability` class) and not duplicated across controllers, views, and database queries.

Heavily inspired by [cancan](https://github.com/CanCanCommunity/cancancan).

## Installation

```sh
npm install casl --save
```

## Features
* supports MongoDB like conditions (`$eq`, `$ne`, `$in`, `$all`, `$gt`, `$lt`, `$gte`, `$lte`, `$exists`, field dot notation)
* can construct MongoDB query based on defined abilities
* supports direct and inverted rules
* provides [mongoose](https://github.com/Automattic/mongoose) plugin
* can be easily integrated with any data storage

## License

[MIT License](http://www.opensource.org/licenses/MIT)
