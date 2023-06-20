const mongoose = require('mongoose');


const IMAGEURL_PATTERN = /^https?:\/\/.+$/i;   

const dataSchema = new mongoose.Schema({   
	name: {
		type: String,
		required: [true, 'Name is requier'],
		minLength: [2, 'The Name should be at least two characters'],
	},
	imageUrl: {
		type: String,
		required: true,
		validate: {
			validator: (value) => IMAGEURL_PATTERN.test(value),
			message: 'The Image should start with http:// or https://.',
		},
	},
	years: {
		type: Number,
		required: true,
		min: [1, 'The years should be a number between 1 and  100'],
		max: [100, 'The years be a number between 1 and  100'],
	},
	description: {
		type: String,
		required: [true,'Need description'],
		minLength: [5, 'The Description should be at least 5 and no longer than 50 characters.'],
        maxLength: [50, 'The Description should be at least 5 and no longer than 50 characters.'],
	},
    kind: {
		type: String,
		required: [true, 'Kind is requiered'],
		minLength: [3, 'The kind should be at least 3 characters'],
	},
    need: {
		type: String,
		required: [true, 'Need is requiered'],
		minLength: [3, 'The need should be at least 3 and no longer than 20 characters'],
		maxLength: [20, 'The need should be at least 3 and no longer than 20 characters'],
	},
    location: {
		type: String,
		required: [true, 'Location is requiered'],
		minLength: [5, 'The location is required and should be at least 5 and no longer than 15 characters'],
		maxLength: [15, 'The location is required and should be at least 5 and no longer than 15 characters'],
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
