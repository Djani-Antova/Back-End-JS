function isLogged() {
   return (req, res, next) => {
        if(req.user) {
            next()
        } else {
          
            res.redirect('/auth/login') //TODO check asignment
            // res.redirect('/404'); 
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if(req.user) {
            res.redirect('/') //TODO check assignment for correct redirect
            //res.redirect('/404');
        } else {
            next()
        }
    };
}

module.exports = {
    isLogged,
    isGuest
}