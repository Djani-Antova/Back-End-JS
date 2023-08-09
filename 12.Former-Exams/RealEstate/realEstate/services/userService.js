const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');

const JWT_SECRET = 'q37987dfgdfg7987dfg'

async function register(name, username, password) {

    const existingName = await User.findOne({ name }).collation({ locale: 'en', strength: 2 });
    if (existingName) {
        throw new Error('Name is taken')
    }
	const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingUsername) {
        throw new Error('Username is taken')
    }

	
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({      
		name, 					    
        username,
        hashedPassword
    });

 
    return createSession(user);
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if(!user) {
        throw new Error('Incorrect username or password')
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if(hasMatch == false) {
        throw new Error('Incorrect username or password');
    }

    return createSession(user);

}

function createSession({ _id, username }) {
    const payload = {
        _id, 
        username
    };
    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    register,
    login,
    verifyToken
};
