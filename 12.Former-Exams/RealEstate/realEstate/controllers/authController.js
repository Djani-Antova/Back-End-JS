const { register, login, } = require('../services/userService');
const { parseError } = require('../util/parser');
const { isGuest } = require('../middlewares/guards');


const authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {  
    res.render('register', {
        title: "Register Page" 
    });
});
 


authController.post('/register', isGuest(), async (req, res) => { 
  
    try {    

        if (req.body.name == '' || req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match')
        }
       
        if(req.body.password.length < 4) {
            throw new Error('Password must be at least 4 characters')
        }
        const token = await register(req.body.name, req.body.username, req.body.password);

       
        res.cookie('token', token);
        res.redirect('/'); 

    } catch (error) {
     
        
        res.render('register', {
            title: "Register Page", 
            errors :  parseError(error),  
            body: {
                name: req.body.name,
                username: req.body.username
            }
        });
    }
});
authController.get('/login', isGuest(), (req, res) => { 
    res.render('login', {
        title: 'Login Page', 
    });
});

authController.post('/login', isGuest(), async (req, res) => { 
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');   
    } catch (error) {
        const errors = parseError(error);
     
        res.render('login', {
            title: 'Login Page', 
            errors,
            body: {
                username: req.body.username
            }
        });

    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/')  
})

module.exports = authController;