const fs = require('fs');

const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8' });

const chunk1 = 'Pesho'
const chunk2 = 'Gosho'
const chunk3 = 'Stamat'

writeStream.write(chunk1)
writeStream.write(chunk2)
writeStream.write(chunk3)