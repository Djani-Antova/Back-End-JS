const EventEmitter = require('node:events');


const eventEmitter = new EventEmitter();

eventEmitter.on('sing', (songTitle) => {
  console.log(`${songTitle} - Lalalala`);
});
eventEmitter.emit('sing', 'Nothing else matters');