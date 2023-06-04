const homeControler = require("../controllers/homeControler");

module.exports = (app) => {
    app.use('/', homeControler);
};