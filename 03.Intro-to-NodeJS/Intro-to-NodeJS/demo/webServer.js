const http = require('http');

const server = http.createServer((req, res) => {
    res.write('Hello from Node.JS')
    res.end()
})
server.listen(5000)

console.log('HTTP running on port 5000...');
