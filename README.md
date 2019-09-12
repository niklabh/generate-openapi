# jsontoopenapi
Convert JSON document to [Open API](https://swagger.io/docs/specification/about/) Specification

# usage

As binary:

```sh
jsontoopenapi file.json type
```

As npm package:

```sh
npm install jsontoopenapi
```

```js
const jsontoopenapi = require('jsontoopenapi')

console.log(jsontoopenapi({a:{b:{c:1,d:'e'},f:1}}, 'type'))
```


