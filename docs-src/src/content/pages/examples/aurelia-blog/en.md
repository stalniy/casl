---
title: Permissions in Aurelia Blog
categories: [example, aurelia]
order: 30
meta:
  keywords: ~
  description: ~
---

This application is a blog application with login/logout functionality. All users are able to read any article and can create/update/delete own articles.

All abilities are defined in `src/config/abilities` and updated each time a new `Session` is created, found or destroyed (i.e., when user logs in or logs out).
Application uses `can` value convertor with `if` binding:

## Technology Stack

* Language: JavaScript
* Framework: [Aurelia]
* Permissions: [@casl/ability] + [@casl/aurelia]
* State management: [js-data]

## Source code

The source code can be found either on [codesandbox](#) or [Github](https://github.com/stalniy/casl-aurelia-example)

## Demo

TODO

[Aurelia]: https://aurelia.io/
[@casl/ability]: ../../guide/intro
[@casl/aurelia]: ../../package/casl-aurelia
[js-data]: https://www.js-data.io/docs
