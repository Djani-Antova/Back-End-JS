const homeControler = require('express').Router();

// TODO replace with real controller by assignment
homeControler.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        user: req.user
    })
});


module.exports = homeControler;
