const { Schema, model } = require('mongoose');


const nameReg = /^([A-Za-z]+) ([A-Za-z]+)$/i; 

const userSchema = new Schema({
    name: { type: String, 
        required: true, 
        match: [nameReg, 'The Name should be in the following format: <firstName> <lastName>'] 
    },
    username: { type: String, 
        required: true, 
        minlength: [5, 'Username must be at least 5 characters long'], 
    },
    hashedPassword: { type: String, 
        required: true
    },

});


const User = model('User', userSchema);

module.exports = User;


