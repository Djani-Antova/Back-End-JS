const http = require('http');
const { getCats, getCat, createCat, updateCat, deleteCat } = require('./handlers/catHandler')


const server = http.createServer((req, res) => {
    if (req.url === '/cats' && req.method === 'GET') {     
        getCats(req, res)
    } 
    else if (req.url.match(/\/cats\/([0-9]+)/) && req.method === 'GET') {      
        const id = req.url.split('/')[2]   
        getCat(req, res, id)
    } else if(req.url === '/cats' && req.method === 'POST') {
        createCat(req, res) 
    } else if (req.url.match(/\/cats\/([0-9]+)/) && req.method === 'PUT') {      
        const id = req.url.split('/')[2]   
        updateCat(req, res, id)
    } else if (req.url.match(/\/cats\/([0-9]+)/) && req.method === 'DELETE') {      
        const id = req.url.split('/')[2]   
        deleteCat(req, res, id)
    }
    else {
        res.writeHead(404, { 'Content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }

})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`))
