const homeControler = require('express').Router();

homeControler.get('/', async (req, res) => {
    //const data = await getAll();
     // TODO replace with real controller by assignment
    res.render('home', {
        title: 'Home Page',
        user: req.user,
       // data = not sure??
    })
});

module.exports = homeControler;

//////////////////GET just getAll() /////////////////////////////////

// homeController.get('/', async (req, res) => {
// 	const data = await getAll();

//     res.render('home', {
//         title: 'Home Page',
//         data   
//          data: []  //TODO try with this option to see the second msg      
//     })
// });
