const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const dataController = require("../controllers/dataController.js");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/data', dataController);    //TO Do here is better to be name for every prodject
    app.all('*', (req, res) => {
        res.render('404', {
            title: '404 Page'
        } );
    });
}