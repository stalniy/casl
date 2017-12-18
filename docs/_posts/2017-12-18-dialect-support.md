---
layout: default
title:  "Dialect Support"
date:   2017-12-18 8:03:48 +0300
categories: [abilities]
tags: [dialect, es5, typescript]
---

CASL is written in pure ES6 and compiled for 3 different dialects:
- UMD
- single ES6 module
- ES5 with ES6 modules (i.e. import/export)

Also CASL provides typings for Typescript, so it can be easily used for enterprise apps and by those who prefers strict typing.

## UMD/ES5

UMD is basically just an ES5 compiled version with helper funciton which allows to run library in different envs
such as browser or Node.js without help of bundlers such as webpack, browserify or rollup  (dist/umd/index.js).

```js
var casl = require('casl')
var ability = casl.AbilityBuilder.define(function(can, cannot) {
  can('read', 'all')
  can('manage', 'Post', { author: loggedInUser.id })
  cannot('delete', 'Post', { 'comments.0': { $exists: true } })
})

console.log(ability.can('read', 'Post'))
```

Alternatively you can access `Ability` constructor:

```js
var casl = require('casl')
var rules = [....]
var ability = new casl.Ability(rules)

console.log(ability.can('read', 'Post'))
```

## ES6

Those who are working on top of the latest browsers are able to use ES6 version of CASL (dist/es6/index.js).

```js
import { AbilityBuilder } from 'casl'

const ability = AbilityBuilder.define((can, cannot) => {
  can('read', 'all')
  can('manage', 'Post', { author: loggedInUser.id })
  cannot('delete', 'Post', { 'comments.0': { $exists: true } })
})

console.log(ability.can('read', 'Post'))
```

## ES5 + Modules

Specifically for webpack to improve tree shaking feature there is a version of library which is compiled into ES5
but contains `export` statements which allow webpack to understand what can be dropped (can be found in root folder of package in `index.js`).


## TypeScript

Typings for TypeScript can be found in `index.ts`. They allow to use CASL in strict typed apps

```ts
import { AbilityBuilder, Ability } from 'casl'

const ability: Ability = AbilityBuilder.define((can, cannot) => {
  can('read', 'all')
  can('manage', 'Post', { author: loggedInUser.id })
  cannot('delete', 'Post', { 'comments.0': { $exists: true } })
})


const canPublishPost: boolean = ability.can('publish', 'Post')
```
