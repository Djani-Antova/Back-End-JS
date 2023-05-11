const Cat = require('../models/catModel') //all handle functions will get (req, res)
const { getPostData } = require('../utils')

// @ desc   Gets All Cats
// @ route  GET /cats
async function getCats(req, res) {
    try {
        const cats = await Cat.findAll()

        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(JSON.stringify(cats))

    } catch (error) {
        console.log(error);
    }
}

// @ desc Gets Single Cat
// @ route GET /cats/:id
async function getCat(req, res, id) {
    try {
        const cat = await Cat.findById(id)

        if (!cat) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Cat Not Found' }))

        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(cat))
        }

    } catch (error) {
        console.log(error);
    }
}

// @ desc   Create a Cat
// @ route  POST /cats
async function createCat(req, res) {
    try {
        const body = await getPostData(req)

        const { name, imageUrl, breed, description } = JSON.parse(body)

        const cat = {
            name,
            imageUrl,
            breed,
            description
        }

        const newCat = await Cat.create(cat)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newCat))

    } catch (error) {
        console.log(error);
    }
}

// @ desc   Update a Cat
// @ route  PUT /cats/:id
async function updateCat(req, res, id) {
    try {
        const cat = await Cat.findById(id)

        if (!cat) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Cat Not Found' }))
        } else {
            const body = await getPostData(req)
    
            const { name, imageUrl, breed, description } = JSON.parse(body)
    
            const catData = {
                name: name || cat.name,
                imageUrl: imageUrl || cat.imageUrl,
                breed: breed || cat.breed,
                description: description || cat.description
            }
    
            const updateCat = await Cat.update(id, catData)
    
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updateCat))
        }

    } catch (error) {
        console.log(error);
    }
}

// @ desc Delete Cat
// @ route DELETE /cats/:id
async function deleteCat(req, res, id) {
    try {
        const cat = await Cat.findById(id)

        if (!cat) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Cat Not Found' }))

        } else {
            await Cat.remove(id) 
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Cat ${id} removed`}))
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getCats,
    getCat,
    createCat,
    updateCat,
    deleteCat
}