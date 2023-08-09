// const { hasUser } = require('../middlewares/guards');
// const { getByUserPurcheses } = require('../services/dataService');

// const profileController = require('express').Router();


// profileController.get('/', hasUser(), async(req, res) => {
// 	const buyers = await getByUserPurcheses(req.user._id);

// 	console.log(buyers);

// 	res.render('profile',{
// 		title: 'Profile',
// 		user: Object.assign({ buyers }, req.user)	
// 	});
// });

// module.exports = profileController;