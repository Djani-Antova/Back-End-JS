const profileControler = require('express').Router();

profileControler.get('/', (req, res) => {
    res.render('profile', {
        title: 'Profile Page'
    })
});

module.exports = profileControler;