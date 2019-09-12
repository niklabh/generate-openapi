# generate-openapi
Convert JSON document to [Open API](https://swagger.io/docs/specification/about/) YML Specification

# usage

As binary:

```sh
generate-openapi file.json type
```

As npm package:

```sh
npm install generate-openapi
```

```js
const generateOpenapi = require('generate-openapi')

console.log(generateOpenapi({a:{b:{c:1,d:'e'},f:1}}, 'type'))
```


