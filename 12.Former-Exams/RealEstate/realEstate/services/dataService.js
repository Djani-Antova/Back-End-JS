const Data = require('../models/data.js');



async function getAllByDate(search){ 
    const query = {};
    if(search) {
       query.title = new RegExp(search, 'i')
    }
   
    return Data.find(query).sort({ type: 1}).lean()   
}


async function getbyId(id){
    return Data.findById(id).lean();
}
//
// async function getByUserPurcheses(userId) {
//     return (await Data.find({ buyers: userId}).lean()).map( d => d.name) //TODO check d.title or ??
// }
//
async function create(data){
    return Data.create(data);
}

async function deletebyId(id){
    return Data.findByIdAndDelete(id);
}

async function updatebyId(id, data){
    const existing = await Data.findById(id); 

    existing.nameProp = data.nameProp;
    existing.type =  data.type;
    existing.year =  data.year;
    existing.city =  data.city;
    existing.imageUrl =  data.imageUrl;
    existing.description =  data.description;
    existing.rooms =  data.rooms;
   
    return existing.save();
}
async function buy(dataId, userId){
    const existing = await Data.findById(dataId); //zarejdame data-ta
    existing.buyers.push(userId);
    existing.userCount++;
    
    return existing.save();
}

// async function getAllByDate(search){ 
//     const query = {};
//     if(search) {
//        query.title = new RegExp(search, 'i')
//     }
   
//     return Data.find(query).sort({ createdAt: 1}).lean()   
// }

module.exports = { // here dont forget to add new functions
    getAllByDate, 
    create,
    getbyId,
    deletebyId,      
    updatebyId,
    buy, 
//      getByUserPurcheses
}

// ======================================


// async function getRecent() {    
//     return Data.find().sort({ userCount: -1}).limit(3).lean();
// }
// async function create(data){
//     return Data.create(data);
// }

// async function getbyId(id){
//     return Data.findById(id).lean();
// }

// async function deletebyId(id){
//     return Data.findByIdAndDelete(id);
// }

// async function updatebyId(id, data){
//     const existing = await Data.findById(id); 

//     existing.title = data.title;
//     existing.description = data.description;
//     existing.imageUrl = data.imageUrl;
//     existing.duration = data.duration; 
   
//     return existing.save();
// }
// async function buy(dataId, userId){
//     const existing = await Data.findById(dataId);
//     existing.buyers.push(userId);
//     existing.userCount++;
//     return existing.save();
// }
// module.exports = { // here dont forget to add new functions
//     getAllByDate, 
//     create,
//     getRecent,
//     getbyId,
//     deletebyId,      
//     updatebyId,
//     buy, 
//      getByUserPurcheses
// }
// ===========================================
// async function getAll(){
//     return Data.find({}).lean()
// }
// async function create(data){
//     return Data.create(data);
// }

// async function getbyId(id){
//     return Data.findById(id).lean();
// }
// async function getbyId(id){
//     return Data.findById(id).populate('owner buyers').lean();  
// }

// async function deletebyId(id){
//     return Data.findByIdAndDelete(id);
// }

// async function updatebyId(id, data){
//     const existing = await Data.findById(id);   // here is data info from the create page

//     existing.name = data.name;
//     existing.price = data.price;
//     existing.imageUrl = data.imageUrl;
//     existing.description = data.description;
//     existing.payment = data.payment;
   
//     return existing.save();
// }

// async function buy(dataId, userId){
//     const existing = await Data.findById(dataId);
//     existing.buyers.push(userId);
//     return existing.save();
// }

// async function search(nameSearch, platformSearch) {  // it depends for what we are looking for
//     let data = await getAll();

//     if (nameSearch){
//         data = data.filter(data => data.name.toLowerCase().includes(nameSearch.toLowerCase()));
//     }

//     if (platformSearch){
//         data = data.filter(data => data.payment.toLowerCase() == platformSearch.toLowerCase());
//     }

//     return data;
// }


// async function getAll(){
//     const allAuction = await Data.find().lean()
//     return allAuction.filter(a=>a.isClosed==false)
// }
// async function getAllClose(){
//     const allAuction = await Data.find().populate('buyers').lean()
//     return allAuction.filter(a=>a.isClosed==true)
// }

// async function getRecent() {     // sort by number enrolled
//     return Data.find().sort({ userCount: -1}).limit(3).lean();
// }



// async function bid(dataId, userId, bidAmount){
//     const existing = await Data.findById(dataId);
//     existing.buyers.push(userId);
//     existing.price = bidAmount;
//     return existing.save();
// }

// async function close(dataId){
//     const existing = await Data.findById(dataId);
//     existing.isClosed = true;
//     return existing.save();
// }

// module.exports = { //  don't forget to add new functions
//     getAll, 
//      getAllByDate,
//     create,
//     getbyId,
//     deletebyId,
//     updatebyId,
//     buy,
//     search
// }