const express = require('express');
const handlebars = require('express-handlebars')

const loggerMiddleware = require('./loggerMiddleware')

const app = express();

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public')) //also middleware, static
app.use(loggerMiddleware); //middleware

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/old', (req, res) => {
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <h1>Hello from Express</h1>
                <a href="/cats">cats</a>
            </body>
        </html>
    `);
});

app.get('/cats', (req, res) => {
    const cats = [
        {name: 'Navcho', breed: 'Persian', age: 7},
        {name: 'Sisa', breed: 'Angora', age: 12},
        {name: 'Zuza', breed: 'Stray', age: 7}
    ]

    res.render('cats', { cats })
  
});

app.get('/cats/1', (req, res) => {
    res.sendFile('./cat.jpg', { root: __dirname })
});

let validateCatIdMiddleware = (req, res, next) => {
    let catId = Number(req.params.catId);

    if (!catId) {
        return res.send('Invalid CatId')
    }

    req.catId = catId;

    next()    
}

app.get('/cats/:catId', validateCatIdMiddleware, (req, res) => {
    // res.send(`<h1>Individual Cat Page - catId=${req.params.catId}</h1`)
    res.render('cat', {id: req.params.catId, isOdd: req.catId % 2 != 0})
})

app.get('/cats/:catId', (req, res) => {
    console.log(req.params);
    const catId = req.params
    res.send(catId)
});

app.post('/cats', (req, res) => {
    res.send('Cat is posted')
});

app.put('/cats', (req, res) => {
    res.send('Cat is updated')
});
app.delete('/cats', (req, res) => {
    res.send('Cat is deleted')
});

app.get('/json', (req, res) => {
    res.json({ ok: true, message: 'hello from json' })
})

app.get('/redirect', (req, res) => {
    res.redirect('/redirected')
})

app.get('/redirected', (req, res) => {
    res.send('This is redireced page')
})
app.get('*', (req, res) => {
    res.send('404')
});


app.listen(5000, () => console.log('Server running on port 5000'))