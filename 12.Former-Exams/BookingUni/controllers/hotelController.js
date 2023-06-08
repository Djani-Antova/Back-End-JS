const { create } = require('../services/hotelService');
const { parseError } = require('../util/parser');

const hotelController = require('express').Router();


hotelController.get('/:id/details', (req, res) => {
    res.render('details', {
        title: 'Hotel Details'
    })
});

hotelController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Hotel'
    })
});
hotelController.post('/create', async (res, req) => {
    const hotel = {
        name:req.body.name,
        city:req.body.city,
        imageUrl:req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner:req.user._id,
    };
    
    try {
       await create(hotel); // we don't need the hotel therefore we don't keep it, otherwise const result = ...
        res.redirect('/')
    } catch (err) { // if error render create, see up
        res.render('create', {
            title: 'Create Hotel',
            body: hotel,
            errors: parseError(err)
        })
    }   
});

hotelController.get('/:id/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit Hotel'
    })
});

module.exports = hotelController;
