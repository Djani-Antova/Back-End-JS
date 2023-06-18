const authController = require('../controllers/authController');
const homeControler = require('../controllers/homeControler');
const dataController = require('../controllers/dataController');

module.exports = (app) => {
    app.use('/', homeControler);
    app.use('/auth', authController);
    app.use('/data', dataController);
    app.all('*', (req, res) => {
        res.render('404', {
            title: '404 Page'
        } );
    });

};
// module.exports = (app) => {
//     app.use('/', homeController);
//     app.use('/auth', authController);
//     app.use('/data', dataController);
//     app.use('/profile', profileController);
//     app.all('*', (req, res) => {
//         res.render('404', {
//             title: '404 Page'
//         } );
//     });
// }

// const authController = require('../controllers/authController');
// const dataController = require('../controllers/dataController');
// const homeControler = require('../controllers/homeControler');
// const { isLogged } = require('../middlewares/guards');

// module.exports = (app) => {
//     app.use('/', homeControler);
//     app.use('/auth', authController);
//     app.use('/data', isLogged(),  dataController);

// };