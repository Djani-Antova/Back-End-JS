const hotelControler = require('express').Router();


hotelControler.get('/:id/details', (req, res) => {
    res.render('details', {
        title: 'Hotel Details'
    })
});

hotelControler.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Hotel'
    })
});

hotelControler.get('/:id/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit Hotel'
    })
});

module.exports = hotelControler;
