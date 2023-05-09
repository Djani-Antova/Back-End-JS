const http = require('http');

const logger = require('./logger');

const reporter = require('./')

const server = http.createServer((req, res) => {
    console.log('TODO...');
    
    logger.log('Request: - ' + req.url)
    reporter.collect(`${req.method} - ${req.url}`)

    res.end()
})

server.listen(5000);
console.log('Server is listening on port 5000...');