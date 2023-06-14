const { getAllByDate, getRecent } = require('../services/dataService');

const homeControler = require('express').Router();


homeControler.get('/', async (req, res) => {

    let view; 
    let data = [];
    
    if(req.user) {
        //user home page
        view = 'user-home';
        data = await getAllByDate(req.query.search)
    } else {
        // guest home page
        view = 'guest-home';
        data = await getRecent()
    }
    res.render(view, {
        title: 'Home Page',
        data,
        search: req.query.search
    })
});

module.exports = homeControler;
