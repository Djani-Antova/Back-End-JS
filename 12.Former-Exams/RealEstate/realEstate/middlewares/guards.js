function hasUser() {
   return (req, res, next) => {
        if(req.user) {
            next()
        } else {          
            res.redirect('/auth/login') //TODO check asignment  - ako e nujen user, no nyama user       
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if(req.user) {
            res.redirect('/') //TODO check assignment for correct redirect - if logged in where to go       
        } else {
            next()
        }
    };
}

module.exports = {
    hasUser,
    isGuest
}