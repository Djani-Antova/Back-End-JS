const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
		type: String,
		required: [true, 'Email is required'],
		minLength: [10, 'The email should be at least 10 characters long'],
	},
    username: { 
        type: String, 
        required: [true, 'Username is required'],
        minlength: [4, 'The username should be at least 4 characters long'],    
    },
    password: { type: String, 
        required: true
    },
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2 //case insensitive
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;








