---
layout: default
title:  "Error Handling"
date:   2017-07-21 10:52:48 +0300
categories: [abilities, errors]
---

You can use `throwUnlessCan` method to throw `ForbiddenError` in case if user doesn't have ability to perform particular action. Afterwards you can catch this exception and provide expressive error message:

```js
try {
  const post = new Post({ private: true })

  ability.throwUnlessCan('delete', post)
  post.destroy()
} catch (error) {
  if (error instanceof ForbiddenError) {
    alert('Access denied!')
  }
}
```

Usually frameworks provide a way to catch errors globally. For example, [expressjs][expressjs-errors] uses the last middleware with 4 arguments for error handling:

```js
const { ForbiddenError } = require('casl')

app.delete('/posts/:id', (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      req.ability.throwUnlessCan('delete', post)
      return post.remove()
    })
    .catch(next)
})

app.use((error, req, res, next) => {
  if (error instanceof ForbiddenError) {
    res.status(403).send({ message: error.message })
  } else {
    // the rest of error handling logic
  }
})
```

In [koa][koa-errors] you need to define first middleware:

```js
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ForbiddenError) {
      ctx.status = 403
    } else {
      ctx.status = error.status || 500
    }

    ctx.body = error.message
    ctx.app.emit('error', error, ctx)
  }
});
```

In [Angular][angular-errors] specify custom `ErrorHandler` provider:

```js
import { NgModule, Injectable, ErrorHandler } from '@angular/core'

@Injectable()
class CustomErrorHandler extends ErrorHandler {
  constructor(toaster: ToasterService) {
    this.toaster = toaster
  }

  handleError(error) {
    if (error instanceof ForbiddenError) {
      this.toaster.error('Access Defined')
    } else {
      super.handleError(error)
    }
  }
}

@NgModule({
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ]
})
export class AppModule {}
```

[expressjs-errors]: http://expressjs.com/en/guide/error-handling.html
[koa-errors]: https://github.com/koajs/koa/wiki/Error-Handling
[angular-errors]: https://angular.io/api/core/ErrorHandler
