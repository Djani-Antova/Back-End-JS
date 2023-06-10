const { getAll } = require('../services/hotelService');

const homeController = require('express').Router();

// TODO replace with real controller by assignment
homeController.get('/', async (req, res) => {
    const hotels = await getAll();
    res.render('home', {
        title: 'Home Page',
        hotels
        //to check the empty option replace it with hotels: []       
    })    
});


module.exports = homeController;
