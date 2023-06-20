const authController = require('../controllers/authController');
const homeControler = require('../controllers/homeControler');
const dataController = require('../controllers/dataController');

module.exports = (app) => {
    app.use('/', homeControler);
    app.use('/auth', authController);
    app.use('/data', dataController);
    app.use('/catalog', dataController);
    app.all('*', (req, res) => {
        res.render('404', {
            title: '404 Page'
        } );
    });

};