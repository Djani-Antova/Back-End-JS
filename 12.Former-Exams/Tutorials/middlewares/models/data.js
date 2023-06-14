const mongoose = require('mongoose');

const IMAGEURL_PATTERN = /^https?:\/\/.+$/i;   

const dataSchema = new mongoose.Schema({  
	title: {
        type: String,
        unique: true,		
		minLength: [4, 'The title should be at least 4 characters'],
	},
    description: {
        type: String,        
        minLength: [20, 'The description should be at least 20 characters long'],
        maxLength: [50, 'The Description should be max 50 characters long.'],
    },
	imageUrl: {
		type: String,		
		validate: {
			validator: (value) => IMAGEURL_PATTERN.test(value),
			message: 'The Image should start with http:// or https://.',
		},
	},
	duration: {
		type: String,
		required: [true, 'Duration is required'],
		min: [0, 'The duration should be a positive number'],
	},
    createdAt: {
        type: String,
		required: true,
        default: () => (new Date()).toISOString().slice(0,10)
    },
	users: {
		type: [mongoose.Types.ObjectId],
		ref: 'User',
        default: []
	},
	userCount: {
		type: Number, 
		default: 0},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
});

dataSchema.index({ title: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
})


const Data = mongoose.model('Data', dataSchema);

module.exports = Data;

