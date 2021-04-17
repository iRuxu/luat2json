const fs = require("fs");
const { parse } = require("../index");
let data = fs.readFileSync("./demo/test.jx3dat", "utf-8");

let result = parse(data);
// console.log(result)

fs.writeFileSync('./demo/test.json',JSON.stringify(result),'utf-8')
