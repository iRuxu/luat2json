const parse = require('../src/parseJx3dat.js')

console.log(parse("return {1,aaa=2,3,[111]=2,[b]=\"22\"}"))