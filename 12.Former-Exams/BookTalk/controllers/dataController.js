// const { isLogged } = require('../middlewares/guards.js');
// const { create, getAll, getbyId, deletebyId, updatebyId, buy, search,} = require('../services/dataService.js');  //// HERE SOME OF THE REQUIERE SHOULD BE CHANDE/ FIRST 5 YOU HAVE ALL THE TIME
// const { parseError } = require('../util/parser.js');

// const dataController = require('express').Router();

// // HERE I MADE A GET AND POST REQUEST FOR   ------> CREATE

// dataController.get('/create', (req, res) => {
// 	res.render('create',{
// 		title: 'Create Page' //TODO Check real title
// 	}
// 	);
// });

// dataController.get('/:id', async (req, res) => { //TODO dataController.get('/:id'... must be last in the 'get'series
// 	const data = await getbyId(req.params.id); 

// 	data.isOwner = data.owner.toString() == req.user._id.toString()

// 	res.render('details', {
// 		title: data.title,
// 		data
// 	})
// })

// dataController.get('/:id/delete', async (req, res) => {

// 	const data = await getbyId(req.params.id);

// 	if (data.owner.toString() != req.user._id.toString()) {
// 		return res.redirect('/auth/login');   //TODO where to go
// 	}
// 		await deletebyId(req.params.id);
// 		res.redirect('/');   //TODO where to go
	
// });


// dataController.post('/create', isLogged(), async (req, res) => {
// 	const body=req.body  /// add to scafforl
// 	const data = {    // HERE IS THE DATA FROM THE EXAMPLE
// 		name: req.body.name,
// 		imageUrl: req.body.imageUrl,
// 		price: Number(req.body.price),
// 		description: req.body.description,
// 		payment: req.body.payment,
// 		owner: req.user._id,
// 	};

// 	try {
// 		await create(data);
// 		res.redirect('/data/catalog');
// 	} catch (error) {
// 		res.render('create', {
// 			errors: parseError(error),
// 			title: 'Create Page', //TODO Check real title
// 			body
// 		});
// 	}
// });

// // HERE I MADE A GET AND POST REQUEST FOR   ------> CATALOG
// dataController.get('/catalog', async (req, res) => {
// 	try {
// 		const alldata = await getAll();
// 		res.render('catalog', {
// 			alldata,
// 			title: "" //TODO Check real title
// 		});
// 	} catch (error) {
// 		res.render('404', {
// 			errors: parseError(error),
//          title: "" //TODO Check real title
// 		});
// 	}
// });

// // HERE I MADE A GET AND POST REQUEST FOR   ------> DETAILS 
// let staticDetails;

// dataController.get('/:id/details', async (req, res) => {
// 	try {
// 		const data = await getbyId(req.params.id);
// 		data.isOwner = data.owner._id == req.user?._id   // HERE SHOULD BE THIS ?  
// 		data.hasBought = data.buyers.map(x => x.toString()).includes(req.user?._id.toString())  
// 		res.render('details', {
// 			data,
// 			user: req.user,
// 			title: 'Details Page' //TODO Check real title
// 		});
// 	} catch (error) {
// 		res.render('404', {
// 			errors: parseError(error),
//          title: "" //TODO Check real title
// 		});
// 	}
// });

// // HERE I MADE A GET AND POST REQUEST FOR   ------>  DELETE 
// dataController.get('/:id/delete', isLogged(), async (req, res) => {
// 	const data = await getbyId(req.params.id);
// 	if (data.owner._id.toString() != req.user._id.toString()) {
// 		return res.redirect('/404');
// 	}

// 	try {
// 		await deletebyId(req.params.id);
// 		res.redirect('/data/catalog');
// 	} catch (error) {
// 		res.render('404', {
// 			errors: parseError(error),
//          title: "" //TODO Check real title
// 		});
// 	}
// });

// // HERE I MADE A GET AND POST REQUEST FOR   ------> EDIT 
// dataController.get('/:id/edit', isLogged(), async (req, res) => {
// 	try {
// 		const data = await getbyId(req.params.id);

// 		if (data.owner._id.toString() != req.user._id.toString()) {
// 			return res.redirect('/404');
// 		}

// 		res.render('edit', {
// 			data,
// 			title: "Edit Page" //TODO Check real title
// 		});
// 	} catch (error) {
// 		res.render('404', {
// 			errors: parseError(error),
// 		});
// 	}
// });

// dataController.post('/:id/edit', isLogged(), async (req, res) => {
// 	const data=req.body
// 	try {
// 		const data = await getbyId(req.params.id);
        
// 		if (data.owner._id.toString() != req.user._id.toString()) {
// 			return res.redirect('/404');
// 		}

//         await updatebyId(req.params.id, req.body);
//         res.redirect(`/data/${req.params.id}/details`)
// 	} catch (error) {
// 		res.render('edit', {
// 			errors: parseError(error),
// 			title: "Edit Page", //TODO Check real title
// 			data
// 		});
// 	}
// });

// // HERE I MADE A GET AND POST REQUEST FOR   ------>  BUY 
// dataController.get('/:id/buy', isLogged(), async (req, res) => {
// 	try {
// 		const data = await getbyId(req.params.id);

// 		if (data.owner.toString() == req.user._id.toString() || data.buyers.map(x => x.toString()).includes(req.user._id.toString())){   
//         	return res.redirect(`/data/${req.params.id}/details`);         
//     	}

// 		await buy(req.params.id, req.user._id);
// 		res.redirect(`/data/${req.params.id}/details`);
// 	} catch (error) {
// 		res.render('404', {
// 			errors: parseError(error),
// 		});
// 	}
// });

// // HERE I MADE A GET AND POST REQUEST FOR   ------>  SEARCH 
// dataController.get('/search', isLogged(), async (req, res) => {
// 	try {
// 		const alldata = await search(req.query.name, req.query.payment); // HERE IS THA PARAM FOR THAT I WANT TO SEARCH NAME, PLATFORMS
// 		res.render('search', {
// 			alldata,
// 			title: 'Search Page' //TODO Check real title
// 		});
// 	} catch (error) {
// 		res.render('404', {
// 			errors: parseError(error),
// 		});
// 	}
// });



// // HERE I MADE A GET AND POST REQUEST FOR   ------>  CLOSE AUCTION 

// dataController.get('/:id/close', async (req, res) => {

// 	try {
// 		await close(req.params.id)
// 		res.redirect('/data/close')
// 	}
// 	catch(error){
// 			res.render('404', {
// 				errors: parseError(error),
//          title: "Trade Catalog" //TODO Check real title
// 			});
// 	}

// })

// dataController.get('/close', async (req, res) => {

// 	try {
// 		const closeAuctions = await getAllClose()
// 		if(closeAuctions.length>0){
// 			closeAuctions.forEach(a=>a.bestBidderInfo=a.buyers[a.buyers.length -1]?.firstName+ " " + a.buyers[a.buyers.length -1]?.lastName)
// 		}
// 		res.render('close', {
// 			closeAuctions
// 		}
// 		)
// 	}
// 	catch(error){
// 			res.render('close', {
// 				errors: parseError(error),
// 			});
// 	}

// })

// module.exports = dataController;







//////////////////////////////////////////////////////////////////////////////////////////////// DETAILS /
// let stataDetails;
// dataController.get('/:id/details', async (req, res) => {
// 	let tamplateRender = 'details' 
// 	try {
// 		const data = await getbyId(req.params.id);
// 		data.isOwner = data.owner._id == req.user?._id 
// 		if(data.isOwner) {
// 			tamplateRender = 'details-owner'
// 		}
		
// 		data.bestBidder = data.buyers[data.buyers.length -1]?._id == req.user?._id
// 		data.hasPeople = data.buyers.length>0
// 		console.log(data.hasPeople);
// 		data.bestBidderInfo = data.buyers[data.buyers.length -1]?.firstName+ " " + data.buyers[data.buyers.length -1]?.lastName
// 		console.log(data.bestBidder)
// 		stataDetails=data
// 		res.render(tamplateRender, {
// 			data,
// 			user: req.user,
// 		});
// 	} catch (error) {
// 		res.render('404', {
// 			errors: parseError(error),
//           title: '' // TODO check where to go
// 		});
// 	}
// });

// dataController.post('/:id/details', async (req, res) => {
// 	const bidAmount = Number(req.body.bidAmount);
// 	try {
// 		const data = await getbyId(req.params.id);
// 		if(bidAmount<=data.price){
// 			throw new Error('Your bid must be higher')
// 		}
// 		await bid(req.params.id, req.user._id, bidAmount)
// 		res.redirect(`/data/${req.params.id}/details`)

// 	} catch (error) {
// 		res.render('details', {
// 			errors: parseError(error),
// 			data: stataDetails
// 		});
// 	}
// });