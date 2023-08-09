const homeControler = require('express').Router();

// TODO replace with real controller by assignment
//if homepage is one keep it, else use 
/*
 homeControler.get('/', async (req, res) => {

    let view; 
    let data = [];
    
    if(req.user) {
        //user home page
        view = 'user-home';
        data = await getAllByDate()
    } else {
        // guest home page
        view = 'guest-home';
        data = await getRecent()
    }
    res.render(view, {
        title: 'Home Page',
        data
    })
});
*/
homeControler.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        user: req.user,
       // data = not sure??
    })
});

module.exports = homeControler;
