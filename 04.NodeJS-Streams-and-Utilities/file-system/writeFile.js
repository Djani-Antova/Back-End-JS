const fs = require('fs/promises');

const data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

fs.writeFile('./file-system/textNew.txt', data, {encoding: 'utf-8'})
.then(() => {
    console.log('finish');
})
.catch((err) => {
    console.log('error');
})