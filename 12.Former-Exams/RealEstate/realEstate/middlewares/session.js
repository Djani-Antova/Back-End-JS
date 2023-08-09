const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;

    if(token) {
    
        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.username = userData.username; //locals are s.th. needed in templates
      
            //TODOME add if 'username' or 'email' is needed in templates
        } catch(err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            //or res.redirect('/404');
            return;
        }
    }

    next();

}