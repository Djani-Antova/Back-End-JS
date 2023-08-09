const homeControler = require('express').Router();
const { getAllByDate } = require('../services/dataService.js'); //inport needed methods


//  homeControler.get('/', async (req, res) => {

//     let view; 
//     let data = [];
    
//     if(req.user) {
//         //user home page
//         view = 'user-home';
//         data = await getAllByDate() // replace with data = await getAllByDate(req.query.search) - Only for search
//     } else {
//         // guest home page
//         view = 'guest-home';
//         data = await getRecent()
//     }
//     res.render(view, {
//         title: 'Home Page',
//         data                        
//         //search: req.query.search - Only for search
//     })
// });
let data = [];

homeControler.get('/', async (req, res) => {
    res.render('catalog', {
        title: 'Home Page',
        data: await getAllByDate(req.query.search), 
        search: req.query.search  

    })
});

module.exports = homeControler;
