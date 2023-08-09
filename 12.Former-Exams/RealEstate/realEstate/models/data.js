const mongoose = require('mongoose');

const IMAGEURL_PATTERN = /^https?:\/\/.+$/i;

const dataSchema = new mongoose.Schema({   
    nameProp: {
        type: String,
        required: [true, 'Name of property is required'], 
        minLength: [6, 'Name of property should be at least 6 characters'],
    },
    type: {
        type: String,
        required: true, 
        enum: {
            values: ["Apartment", "Villa", "House"],
            message: '{VALUE} is not supported !',
        },        
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1850, 'The Year should be at least 1850'],
        max: [2021, 'The Year should be at most 2021'],
    },
    city: {
        type: String,
        required: [true, 'Need city name'],
        minLength: [4, 'Thecity name should be a minimum of 4 characters long.'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => IMAGEURL_PATTERN.test(value),
            message: 'The Image should start with http:// or https://.',
        },
    },
    description: {
        type: String,
        required: [true, 'Need description'],
        maxLength: [60, 'The Description should be max 60 characters long.'],
    },
    rooms: {
        type: Number,
        required: true,
        min: [0, 'The rooms should be at least 0'],
        max: [10, 'The Year should be at most 10'],
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
    userCount: {
        type: Number,
        default: 0
    },

});

dataSchema.index({ type: 1 }, { //TODOME only for SEARCH case when we need case insensitive titles in ascending order
    collation: {
        locale: 'en',
        strength: 2
    }
})

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
