const parse = require('luaparse').parse;
const fs = require('fs');

let data = fs.readFileSync('./tools/test.jx3dat','utf-8')
let result = parse(data)
console.log(result.body[0]['arguments'][0]['fields'])