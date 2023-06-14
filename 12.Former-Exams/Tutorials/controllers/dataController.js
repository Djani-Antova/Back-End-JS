const { create, getAllByDate, getbyId, deletebyId, updatebyId, buy, search,} = require('../services/dataService.js');  

const { parseError } = require('../util/parser.js');


const dataController = require('express').Router();

dataController.get('/create', (req, res) => {
	res.render('create',{
		title: 'Create Course'
	}
	);
});
dataController.get('/:id', async (req, res) => { 
	const data = await getbyId(req.params.id); 

	data.isOwner = data.owner.toString() == req.user._id.toString();
	data.hasBought = data.users.map(x => x.toString()).includes(req.user._id.toString()) 

	res.render('details', {
		title: data.title,
		data
	})
});

dataController.get('/:id/delete', async (req, res) => {

	const data = await getbyId(req.params.id);

	if (data.owner.toString() != req.user._id.toString()) {
		return res.redirect('/auth/login');  
	}
		await deletebyId(req.params.id);
		res.redirect('/'); 
	
});


dataController.post('/create', async (req, res) => {
	
	const data = {    
		title: req.body.title,
		description: req.body.description,
		imageUrl: req.body.imageUrl,		
		duration: req.body.duration,
		owner: req.user._id,
	};
	

	try {
		await create(data);
		res.redirect('/');
	} catch (error) {        
		res.render('create', {
			errors: parseError(error),
			title: 'Create Page',
			body: data
		});
	}
});
dataController.get('/:id/edit', async (req, res) => {	

		const data = await getbyId(req.params.id);

		if (data.owner.toString() != req.user._id.toString()) {
			return res.redirect('/auth/login');  
		}

		res.render('edit', {
			title: "Edit Page",
			data,
		});
	
});

dataController.post('/:id/edit',  async (req, res) => { 
 
	const data = await getbyId(req.params.id);

	if (data.owner.toString() != req.user._id.toString()) {
		return res.redirect('/auth/login');  
	}

	try {
		await updatebyId(req.params.id, req.body);
		res.redirect(`/data/${req.params.id}`)
	} catch (error) {
		res.render('edit', {
			title: "Edit Page",
			errors: parseError(error),
			data: req.body
		});
	}
});
dataController.get('/:id/buy', async (req, res) => {
	const data = await getbyId(req.params.id);

	if (data.owner.toString() == req.user._id.toString()
		&& data.users.map(x => x.toString()).includes(req.user._id.toString()) == false) {
			await buy(req.params.id, req.user._id);
		}		
		res.redirect(`/data/${req.params.id}`)
	
});



module.exports = dataController;
