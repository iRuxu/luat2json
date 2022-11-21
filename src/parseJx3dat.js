const parse_raw = require('luaparse').parse;

function parse(data) {
    let raw = parse_raw(data)
    let table_body = raw.body[0]["arguments"][0]["fields"]
    let result = {}
    result = getTableConstructorValue(table_body)
    return result
}

// 转换为对象
function getTableConstructorValue(fields) {
    let obj = {}
    fields.forEach((item, i) => {
        obj[getKey(item, i)] = getValue(item.value)
    })
    return obj
}

// 匹配索引
function getKey(item, i) {
    switch (item.type) {
        case 'TableValue':
            return i + 1;
        case 'TableKeyString':
            return item.key.name;
        case 'TableKey':
            if (item.key.raw === '0') {
                return '0'
            } else {
                return getValue(item.key);
                // 注：数组作键的处理并不规范
                //return item.key.value || (item.key.raw && item.key.raw.split('"')[1] + '') || null
            }
    }
}

// 获取值
function getValue(item) {
    // console.log(item)
    switch (item.type) {
        case 'NumericLiteral':
            return ~~item.raw;      //注：没有处理大整数，限32位
        case 'StringLiteral':
            return item.raw.split('"')[1] + '';
        case 'NilLiteral':
            return null;
        case 'BooleanLiteral':
            return item.value;
        case 'TableConstructorExpression':
            return getTableConstructorValue(item.fields);
        case 'UnaryExpression':
            return Number(item.operator + item.argument.value);
        case 'Identifier':
            return item.name;
        default:
            return;
    }
}



module.exports = parse