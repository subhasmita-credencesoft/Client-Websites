const fs = require('fs');
const p = 'public/llms.txt';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/\u2013/g, '-').replace(/\u2014/g, '-');
c = c.replace(/Kalamboli[^\r\n]+/, 'Kalamboli, Navi Mumbai - 410 218');
fs.writeFileSync(p, c, 'utf8');
console.log('done');
