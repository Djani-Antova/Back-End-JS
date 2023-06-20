const { Schema, model } = require('mongoose');

const emailReg = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/i     

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minLength: [10, 'The email should be at least ten character long'],
        match: [emailReg, 'The email should be in the following format: <name>@<domain>.<extension>']         
    },

    hashedPassword: {
        type: String,
        required: true
    },

});


const User = model('User', userSchema);

module.exports = User;



