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

        if (req.body.email == '' || req.body.password == '') {
            throw new Error('All fields are required')
        }
        if (req.body.email.length < 10) {
            throw new Error('Email has to be at least 10 characters');
        }
        if (req.body.password.length < 4) {
            throw new Error('Password has to be at least 4 characters');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match')
        }
     
        const token = await register(req.body.email, req.body.password); 
        console.log(token)
   

        res.cookie('token', token);
        res.redirect('/'); 
    } catch (error) {
        const errors = parseError(error);
        console.log(errors);

        
        res.render('register', {
            title: "Register Page", 
            errors,
            body: {
                email: req.body.email
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
        const token = await login(req.body.email, req.body.password);  

        res.cookie('token', token);
        res.redirect('/'); 
    } catch (error) {
        const errors = parseError(error);
       
        res.render('login', {
            title: 'Login Page', 
            errors,
            body: {
                email: req.body.email 
                
            }
        });

    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/')  
})

module.exports = authController;
