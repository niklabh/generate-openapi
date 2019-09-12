#! /usr/bin/env node

const pad = (num) => {
  let pad = ""
  for (let i = 0; i < num; i++) {
    pad += " "
  }
  return pad
}

const recurse = (a, type, num) => {
  for (let key in a) {
    if (typeof a[key] === "boolean" || typeof a[key] === "string" || typeof a[key] === "number" || a[key] === null) {
      console.log((pad(2 * (num - 1))) + key + ":");
      console.log((pad(2 * num)) + "description: " + type + " " + key)
      console.log((pad(2 * num)) + "type: " + (a[key] === null ? "string" : typeof a[key]))
      console.log((pad(2 * num)) + "example: " + (a[key] === null ? key : (typeof a[key] === "string" ? (a[key].startsWith("http") ? "http://example.com/abc/xyz" : (a[key].length > 42 ? "lorem ipsum dolar sit amet" : '"' + a[key] + '"')) : a[key])))

      continue;
    }

    if (Array.isArray(a[key])) {
      if (a[key][0] === undefined || typeof a[key][0] === "string") {
        console.log((pad(2 * (num - 1))) + key + ":");
        console.log((pad(2 * num)) + "description: " + type + " " + key);
        console.log((pad(2 * num)) + "type: array")
        console.log((pad(2 * num)) + "items:")
        console.log((pad(4 * num)) + "type: string")
        console.log((pad(2 * num)) + "example:")
        if (a[key].length === 0) {
          console.log((pad(4 * num)) + "- " + key)
        } else {
          a[key].forEach((item) => {
            console.log((pad(4 * num)) + "- " + (item.length > 42 ? "lorem ipsum dolar sit amet" : '"' + item + '"'))
          })
        }
        continue;
      }

      if (typeof a[key][0] === "object") {
        console.log((pad(2 * (num - 1))) + key + ":");
        console.log((pad(2 * num)) + "description: " + type + " " + key);
        console.log((pad(2 * num)) + "type: array")
        console.log((pad(2 * num)) + "items:")
        console.log((pad(4 * num)) + "type: object")
        console.log((pad(4 * num)) + "properties:")
        recurse(a[key][0], type + " " + key, num + 3)
        continue;
      }
    }

    if (a[key] && typeof a[key] === "object") {
      console.log((pad(2 * (num - 1))) + key + ":");
      console.log((pad(2 * num)) + "description: " + type + " " + key);
      console.log((pad(2 * num)) + "type: object")
      console.log((pad(2 * num)) + "properties:")
      recurse(a[key], type + " " + key, num + 2)
    }

  }
}

const jsontoopenapi = (json, type) => {
  console.log(type + ":")
  console.log(pad(2) + "type: object")
  console.log(pad(2) + "properties:")

  recurse(json, type, 3)
}

module.exports = jsontoopenapi

if (require.main === module) {
  if (!process.argv[2] || !process.argv[3]) {
    console.log(`Usage:
    jsontoopenapi file.json type
    `)
    process.exit(1);
  }

  const json = require('./' + process.argv[2])
  const type = process.argv[3]

  jsontoopenapi(json, type)
}

