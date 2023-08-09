const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;

    if(token) {
        //console.log(token);
        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.username = userData.username;
            res.locals.email = userData.email;
            //TODO add if 'username' is needed in main.hbs
        } catch(err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            //or res.redirect('/404');
            return;
        }
    }

    next();

}