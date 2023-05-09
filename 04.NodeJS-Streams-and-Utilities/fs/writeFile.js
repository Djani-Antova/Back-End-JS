const fs = require('fs');
const path = require('path');

//console.log(__dirname); - provides absolute address of the file

fs.writeFile(path.resolve(__dirname, './output.txt'), 'Pesho', () => {
    console.log('File created');
    // if(err) {
    //     console.log(err);
    //     return
    // }
})