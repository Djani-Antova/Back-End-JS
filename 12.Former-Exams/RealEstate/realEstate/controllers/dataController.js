const dataController = require('express').Router();

const { hasUser } = require('../middlewares/guards.js');
const { create, getbyId, getAllByDate, deletebyId, updatebyId, buy, search } = require('../services/dataService.js');
// const { create, getAll, getbyId, deletebyId, updatebyId, buy, search,} = require('../services/dataService.js');  //// HERE SOME OF THE REQUIRED SHOULD BE CHANDED/ FIRST 5 YOU HAVE ALL THE TIME
const { parseError } = require('../util/parser.js');



////////////////// GET AND POST REQUEST FOR   ------> CREATE  //////////////////

dataController.get('/create', hasUser (), (req, res) => {
	res.render('create',{
		title: 'Create Page' 
	}
	);
});

dataController.get('/catalog', async (req, res) => {
	try {
		const data = await getAllByDate();
		res.render('catalog', {
			data,
			title: "Catalog" 
		});
	} catch (error) {
		res.render('404', {
			errors: parseError(error),
         title: "404" 
		});
	}
});

////////////////// GET AND POST REQUEST FOR   ------> DETAILS //////////////////

dataController.get('/:id', async (req, res) => { //TODO dataController.get('/:id'... must be last in the 'get'series
	const data = await getbyId(req.params.id); 
    // console.log(req.params.id.toString());
    // console.log(req.user._id.toString());

    data.isOwner = data.owner?._id == req.user?._id   // HERE SHOULD BE THIS ?  

    data.hasBought = data.buyers.map(x => x.toString()).includes(req.user?._id.toString())  // TODO add for buy/like, before that no

	res.render('details', {
		title: data.title,
		data,
        user: req.user,
	})

})


dataController.get('/:id/delete', async (req, res) => {

	const data = await getbyId(req.params.id); // zarejdame zapisa

	if (data.owner.toString() != req.user._id.toString()) {
		return res.redirect('/data/catalog');   //TODO where to go
	}
		await deletebyId(req.params.id);
		res.redirect('/');   //TODO where to go
	
});


dataController.post('/create', hasUser(), async (req, res) => {
	//const body=req.body  /// just for info
	const data = {    
		nameProp: req.body.nameProp,
		type: req.body.type,
		year: Number(req.body.year),
        city: req.body.city,
		imageUrl: req.body.imageUrl,
		description: req.body.description,
		rooms: Number(req.body.rooms),
	};

	try {
		await create(data);
		res.redirect('/data/catalog');  // TODO check if res.redirect('/data/catalog'); 
		
	} catch (error) {
		    res.render('create', {
		    title: 'Create Page', 
			errors: parseError(error),
			body: data
		});
	}
});


////////////////// GET AND POST REQUEST FOR   ------> EDIT //////////////////
dataController.get('/:id/edit',  async (req, res) => {
	const data = await getbyId(req.params.id);
   

		if (data.owner._id.toString() != req.user._id.toString()) {
			return res.redirect("/auth/login"); //or redirect('404')
		}

		res.render('edit', {
			data,
			title: "Edit Page" 
		});
	
});

dataController.post("/:id/edit", async (req, res) => {
    const data = await getbyId(req.params.id);
  
    if (data.owner._id.toString() != req.user._id.toString()) {
      return res.redirect("/auth/login"); //or redirect('/auth/login')
    }
    try {
      await updatebyId(req.params.id, req.body);
      res.redirect(`/data/${req.params.id}`);
    } catch (error) {
      res.render("edit", {
        title: "Edit Page",
        errors: parseError(error),
        data: req.body,
      });
    }
  });

// //////////// REQUEST FOR   ------>  BUY/ENROLL/LIKE 
dataController.get('/:id/buy', async (req, res) => {

		const data = await getbyId(req.params.id);

		if (data.owner.toString() != req.user._id.toString() && data.buyers.map(x => x.toString()).includes(req.user._id.toString()) == false){   
            await buy(req.params.id, req.user._id)
        }
        
         return res.redirect(`/data/${req.params.id}/edit`);    


});



// // HERE I MADE A GET AND POST REQUEST FOR   ------>  SEARCH 
dataController.get('/search', async (req, res) => {
	try {
		const data = await search(req.query.type); // HERE IS THA PARAM FOR THAT I WANT TO SEARCH NAME, PLATFORMS
		res.render('search', {
			data,
			title: 'Search Page' 
		});
	} catch (error) {
		res.render('404', {
			errors: parseError(error),
		});
	}
});



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

module.exports = dataController;






///////////////////////////////////////////////////// DETAILS ///////////////
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
// dataController.get('/:id/buy', async (req, res) => {
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