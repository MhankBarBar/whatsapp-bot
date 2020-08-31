const got = require('got')

var a = got.get('http://api.fdci.se/cerpen')
console.log(a.text())