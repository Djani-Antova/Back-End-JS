const { isLogged } = require('../middlewares/guards.js');
const { create, getAll, getbyId, deletebyId, updatebyId, buy, search,} = require('../services/dataService.js'); 

const { parseError } = require('../util/parser.js');

const dataController = require('express').Router();




///////////////////////////////////// CREATE //////////////////////////////
dataController.get('/create', isLogged(

), (req, res) => {
	res.render('create',{
		title: 'Create Page'
	});
});


dataController.post('/create', isLogged(), async (req, res) => {
	
	const data = {   
		name: req.body.name,
		imageUrl: req.body.imageUrl,
		years: Number(req.body.years),
		description: req.body.description,
		kind: req.body.kind,
		need: req.body.need,
		location: req.body.location,
		owner: req.user._id,
	};
   
	try {

    if(Object.values(data).some(v => !v)) { 
        throw new Error ('All fields are required')
    }
		await create(data);
		res.redirect('/catalog'); 

		
	} catch (error) {
		res.render('create', {
			errors: parseError(error),
			title: 'Create Page', 
			body: req.body,
		});
	}

});

dataController.get('/catalog', async (req, res) => {
	
		const data = await getAll();
		res.render('catalog', {
			data,
			title: "Catalog" 
		})
		
});


dataController.get('/:id/delete', isLogged(), async (req, res) => {

	const data = await getbyId(req.params.id);

	if (data.owner!= req.user._id) {
		return res.redirect('/auth/login'); // or ('/404)
	}

	await deletebyId(req.params.id);
	res.redirect('/')
});

///////////////////////////////// EDIT //////////////////////////
dataController.get('/:id/edit', isLogged(), async (req, res) => {

const data = await getbyId(req.params.id);

if (data.owner != req.user._id) {
    return res.redirect('/auth/login'); // or ('/404)
}

    res.render('edit', {
        title: "Edit Page", 
        data,
    });
});

dataController.post('/:id/edit', isLogged(), async (req, res) => {

const data = await getbyId(req.params.id);

    if (data.owner != req.user._id) {
        return res.redirect('/auth/login'); // or ('/404)
    }	

    const editedData = {   
		name: req.body.name,
		imageUrl: req.body.imageUrl,
		years: Number(req.body.years),
		description: req.body.description,
		kind: req.body.kind,
		need: req.body.need,
		location: req.body.location,
		
    };
	
	
 
    try {	
        if(Object.values(editedData).some(v => !v)) {  
            throw new Error ('All fields are required')
        }

        await updatebyId(req.params.id, editedData);
        res.redirect(`/data/${req.params.id}/details`); 

    } catch (error) {
		
        res.render('edit', {
            title: "Edit Page", 
            data: Object.assign(editedData, {_id: req.params.id}),
            errors: parseError(error),
        });
    }
});

////////////////////////////////////// DETAILS ///////////////////////////////////////////

dataController.get('/:id/details', async (req, res) => {
	try {
		const data = await getbyId(req.params.id);
		data.isOwner = data.owner._id == req.user?._id   // MIND THE ?  
		data.hasBought = data.buyers.map(x => x.toString()).includes(req.user?._id.toString())  

		res.render('details', {
			data,
			user: req.user,
			title: 'Details Page'
		});
	} catch (error) {
		res.render('404', {
			errors: parseError(error),
         title: "404"
		});
	}
});

////////////////////////////////////// DONATE using BUY word ///////////////////////////////////////////

dataController.get('/:id/buy', isLogged(), async (req, res) => {

	const dataId = req.params.id;
	const userId = req.user._id;

	console.log('test');
	
	try {
		if (data.owner == req.user._id) {
			data.isOwner = true;
			throw new Error('It is your own item')			
		}
		
		if (data.buyers.includes(req.user._id)) {
			throw new Error('Cannot do it twice');
		}
		
		await buy(dataId, userId);

		console.log(dataId);
		console.log(userId);

		console.log('test');

		res.redirect(`/data/${dataId}/details`);
		
	} catch (error) {
		const data = await buy(req.params.id);

		res.render('details', {
			title: 'Details Page',
			data,
			errors: parseError(error),
		});
	}
});


module.exports = dataController;



