const express = require('express');
const fs = require('fs');
const path = require('path')
const { catMiddleware } = require('./middlewares')

const app = express() //app is actually our server, 
                        // this is a factory function 
                            // Create a new instance of the application 


app.use('/static', express.static('public')); //for static/public files

app.use(catMiddleware)                            

//Action
app.get('/', (req, res) => {
    // res.write('Hello World!');
    // res.write('\n');
    // res.write('Hello World!');
    // res.end();
    res.send('Hello World with Express!')
});

app.get('/img/:imgName', (req, res) => {
    res.sendFile(path.resolve('./public/img', req.params.imgName))
})

app.get('/cats', (req, res) => {
    if(req.cats.length > 0 ) {
        res.send(req.cats.join(', '))
    } else {
        res.send('No cats here!')
    }
});



app.post('/cats/:catName', (req, res) => {
    req.cats.push(req.params.catName)

    res.status(201)
    res.send(`Add ${req.params.catName} to the collection`)
});


app.put('/cats', (req, res) => {
    // TODO implement posting cat
    res.send('Modify existing cat')
});

//Default way (HTTP way) to download
app.get('/download', (req, res) => {
    res.writeHead(200, {
        //'content-disposition' : 'attachment; fileName = sample.pdf'
        'content-type': 'application/pdf', //MIME type
        'content-disposition': 'inline'
    });

    const readStream = fs.createReadStream('sample.pdf');

    readStream.pipe(res);

    // readStream.on('data', (data) => {
    //     res.write(data)
    // });

    // readStream.on('end', () => {
    //     res.end();
    // });

})

//Express way to download
app.get('/express-download', (req, res) => {
    res.download('sample.pdf')
})

//Default way (HTTP way) to redirect

app.get('/redirect', (req, res) => {
    res.writeHead(302, {
        'Location': '/cats'
    });
    res.end()
})

//Express way to redirect
app.get('/express-redirect', (req, res) => {
    res.redirect('/cats')
})

app.get(/[0-9]+/, (req, res) => {
    res.send('Only number route')
});

app.get('/cats*', (req, res) => {
    res.send('Routing starting with cat')
})

app.all('*', (req, res) => {
    // TODO implement posting cat
    res.status(404)
    res.send('Cannot find this page')
});


app.listen(5000, () => console.log('Server is listening on port 5000...'))

