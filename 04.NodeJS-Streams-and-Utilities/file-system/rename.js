const fs = require('fs/promises');

fs.rename('./renamed', 'renamedDir')
.then(() => {
    console.log('finished renaming');
})
