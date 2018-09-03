# Change Log

All notable changes to this project will be documented in this file.

# [@casl/react-v0.8.0](https://github.com/stalniy/casl/compare/@casl/react@0.7.2...@casl/react@0.8.0) (2018-09-03)


### Bug Fixes

* **README:** changes links to [@casl](https://github.com/casl)/ability to point to npm package instead to git root [skip ci] ([a74086b](https://github.com/stalniy/casl/commit/a74086b)), closes [#102](https://github.com/stalniy/casl/issues/102)


### Features

* **react:can:** adds `an` alias to `on` prop ([748ea64](https://github.com/stalniy/casl/commit/748ea64))
* **react:can:** adds `passThrough` option ([045318c](https://github.com/stalniy/casl/commit/045318c)), closes [#105](https://github.com/stalniy/casl/issues/105)
* **react:can:** adds support for multiple <Can> children ([c022b32](https://github.com/stalniy/casl/commit/c022b32))
* **react:can:** updates typescript declarations ([70953ed](https://github.com/stalniy/casl/commit/70953ed))
* **react:can:** updates typescript declarations ([213dcde](https://github.com/stalniy/casl/commit/213dcde))


### Performance Improvements

* **react:can:** moves prop type checks undef `if`, so they can be removed for production builds ([4bebf0b](https://github.com/stalniy/casl/commit/4bebf0b))

# [@casl/react-v0.7.2](https://github.com/stalniy/casl/compare/@casl/react@0.7.1...@casl/react@0.7.2) (2018-07-29)


### Bug Fixes

* **react:** makes `not` prop to be optional ([8f841bf](https://github.com/stalniy/casl/commit/8f841bf)), closes [#95](https://github.com/stalniy/casl/issues/95)

<a name="@casl/react-v0.7.1"></a>
# [@casl/react-v0.7.1](https://github.com/stalniy/casl/compare/@casl/react@0.7.0...@casl/react@0.7.1) (2018-07-02)


### Bug Fixes

* **package:** changes location of ES5M modules ([2b1ad4e](https://github.com/stalniy/casl/commit/2b1ad4e)), closes [#89](https://github.com/stalniy/casl/issues/89)

<a name="@casl/react-v0.7.0"></a>
# [@casl/react-v0.7.0](https://github.com/stalniy/casl/compare/@casl/react@0.6.0...@casl/react@0.7.0) (2018-06-15)


### Bug Fixes

* **react:** adds ts defs for `not` attribute ([17f76a9](https://github.com/stalniy/casl/commit/17f76a9))
* **react:** contextual can don't respect 'not' prop ([#74](https://github.com/stalniy/casl/issues/74)) ([d727230](https://github.com/stalniy/casl/commit/d727230))


### Features

* **vue:** adds can component ([42ee540](https://github.com/stalniy/casl/commit/42ee540)), closes [#63](https://github.com/stalniy/casl/issues/63)


<a name="@casl/react-v0.6.0"></a>
# [@casl/react-v0.6.0](https://github.com/stalniy/casl/compare/@casl/react@0.5.0...@casl/react@0.6.0) (2018-05-28)


### Bug Fixes

* **react:** adds `I`, `a`, `of`, `this` aliases in types ([a412868](https://github.com/stalniy/casl/commit/a412868)), closes [#65](https://github.com/stalniy/casl/issues/65)


### Features

* **react:** adds `not` attribute ([94ef6d4](https://github.com/stalniy/casl/commit/94ef6d4)), by @emilbruckner in [#66](https://github.com/stalniy/casl/issues/66)


<a name="0.5.0"></a>
# 0.5.0 (2018-05-14)

### Features

* **react:** support for more readable component ([1a8c1ec](https://github.com/stalniy/casl/commit/1a8c1ec))



<a name="0.4.0"></a>
# 0.4.0 (2018-04-23)


### Bug Fixes

* **react:** rechecks abilities in `Can` on props update ([e08db1e](https://github.com/stalniy/casl/commit/e08db1e)), closes [#55](https://github.com/stalniy/casl/issues/55)


<a name="0.3.0"></a>
# 0.3.0 (2018-04-20)


### Bug Fixes

* **react:** fixes support for React 15.x ([8e17738](https://github.com/stalniy/casl/commit/8e17738))
* **react:** fixes typings for react 15.x & 16.x ([f147a8a](https://github.com/stalniy/casl/commit/f147a8a)), closes [#38](https://github.com/stalniy/casl/issues/38)



<a name="0.2.0"></a>
# 0.2.0 (2018-04-20)


### Features

* **react:** adds typescript definition for package [@casl](https://github.com/casl)/react ([37718fe](https://github.com/stalniy/casl/commit/37718fe)), closes [#54](https://github.com/stalniy/casl/issues/54)


<a name="0.1.0"></a>
# 0.1.0 (2018-03-23)

### Features

* **component:** adds `Can` component, relates to [#23](https://github.com/stalniy/casl/issues/23)
* **integration:** adds `createContextualCan` function which allows to work with new React Context API, relates to [#23](https://github.com/stalniy/casl/issues/23)
* **integration:** adds `createCanBoundTo` function which allows to bind ability to component, relates to [#23](https://github.com/stalniy/casl/issues/23)
