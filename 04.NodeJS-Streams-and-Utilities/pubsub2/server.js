const http = require('http');

// const logger = require('./logger');
// const reporter = require('./reportingService')

const eventBus = require('./eventBus')

const server = http.createServer((req, res) => {
    console.log('TODO');
    
    // logger.log('Request: - ' + req.url)
    // reporter.collect(`${req.url} - ${req.method}`)
    eventBus.publish('request', {method: req.method, url: req.url})

    res.end()
})

server.listen(5000);
console.log('Server is listening on port 5000...');