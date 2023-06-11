const authController = require('../controllers/authController');
const homeControler = require('../controllers/homeControler');

module.exports = (app) => {
    app.use('/', homeControler);
    app.use('/auth', authController);


};