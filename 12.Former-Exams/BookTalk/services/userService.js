const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');

const JWT_SECRET = 'q37987dfgdfg7987dfg'

async function register( email, username, password) {  

	const existingUsername = await User.findOne({ username }); 

	if (existingUsername) {                                    
		throw new Error('Username or email already exists !'); 
	}

	const existingEmail = await User.findOne({ email }); 
	if (existingEmail) {                                    
		throw new Error('Username or email already exists !'); 
	}

	if (password.length < 4) {                     
		throw new Error('The password should be at least four characters long');
	}

	const hashedPassword = await bcrypt.hash(password, 10); 

	const user = await User.create({                          
		email,											
		username,
		password: hashedPassword 
	});

	return createSession(user);  
} 

// async function login(email, password) {	
	
// 	const user = await User.findOne({ email }); 
	
	
// 	if (!email) {                                    
// 		throw new Error('Incorrect email or password!'); 
// 	}
// 	if (!password) {                                    
// 		throw new Error('Incorrect email or password!'); 
// 	}
	
//     const hasMatch = await bcrypt.compare(password, user.password); 
	
//     if(hasMatch == false) {
//         throw new Error('Incorrect email or password');
//     }

//     return createSession(user);



function createSession({ _id, email }) {
    const payload = {
        _id, 
        email,
    };
    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
	
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    register,
   // login,
    verifyToken
};
