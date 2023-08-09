const { isGuest } = require('../middlewares/guards');
const { register, login, } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: 'Register Page',
    });
});


authController.post('/register', isGuest(), async (req, res) => {

    try {
        const { username, email, password, repass } = req.body

        if (req.body.email.length < 10) {
            throw new Error('Email has to be at least 10 characters');
        }
        if (req.body.username.length < 4) {
            throw new Error('Username has to be at least 4 characters');
        }
        if (req.body.password.length < 3) {
            throw new Error('Password has to be at least 3 characters');
        }
        if (req.body.password !== req.body.repass) {
            throw new Error('Passwords don\'t match');
        }

        const token = await register(req.body.email, req.body.username, req.body.password);


        //TODO check assignment to see if register creates session
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);
        console.log(errors);

        res.render('register', {
            title: "Register Page", //TODO Check real title
            errors,
            body: {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            }
        });
    }
});
// authController.get('/login', isGuest(), (req, res) => { 
    
//     res.render('login', {
//         title: 'Login Page', 
//     });
// });

// authController.post('/login', isGuest(), async (req, res) => { 
//     try {
//         const token = await login(req.body.email, req.body.password);

//         res.cookie('token', token);
      
//         res.redirect('/');   
//     } catch (error) {
//         const errors = parseError(error);

//         // console.log(errors);
//         // TODO add error display to actual template from assignment
//         res.render('login', {
//             title: 'Login Page', 
//             errors,
//             //body: req.body
//         });
//     }
// });

// authController.get('/logout', (req, res) => {
//     res.clearCookie('token');
//     res.redirect('/')  
// })

module.exports = authController;
