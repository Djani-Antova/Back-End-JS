const mongoose = require('mongoose');

const IMAGEURL_PATTERN = /^https?:\/\/.+$/i;

// buyers - WishingList – a collection of Users (a reference to the User model)


const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Title should be at least 2 characters'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        minlength: [5, 'Author should be at least 5 characters'],
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+$/, 'The Home Image should starts with http:// or https://.'],
    },
    description: { 
        type: String,
        required: [true, 'Book review is required'],
        minlength: [10, 'Review should be a minimum of 10 characters long'],
    },
     genre: {
        type: String,
        required: [true, 'Genre is requier'],
        minlength: [3, 'Genre should be at least 3 characters'],
    },
    starts: {
        type: Number,
        required: true,
        min: [1, 'Stars is between 1 and 5'],
        max: [5, 'Stars is between 1 and 5'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: []
    }, 
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;


