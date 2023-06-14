const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');
const homeControler = require('../controllers/homeControler');
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    app.use('/', homeControler);
    app.use('/auth', authController); 
    app.use('/data', hasUser(),  dataController);

};
