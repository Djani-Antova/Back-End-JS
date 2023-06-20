const Data = require('../models/data.js');

async function getAll() {
    return Data.find({}).lean();
}

async function create(data){
    return Data.create(data);
}

async function getbyId(id){
    return Data.findById(id).lean();
}
async function deletebyId(id){
    return Data.findByIdAndDelete(id);
}

async function updatebyId(id, data){
    const existing = await Data.findById(id); 

    existing.name = data.name;
    existing.imageUrl = data.imageUrl;
    existing.years = data.years;
    existing.description = data.description;
    existing.kind = data.kind; 
    existing.need = data.need; 
    existing.location = data.location; 
   
    return existing.save();
}


async function buy(dataId, userId){

    const data = await Data.findById(dataId);
    
   
    
    if(data.buyers.includes(userId)) {
        throw new Error('Cannot do it twice')
    }

    console.log(data);
    data.buyers.push(userId);
    return data.save();
}


module.exports = { 
    getAll, 
    create,
    // getRecent,
    getbyId,
    deletebyId,    
    updatebyId,
    buy, 
}



// async function getAllByDate(search){ 
//     const query = {};
//     if(search) {
//        query.title = new RegExp(search, 'i')
//     }
   
//     return Data.find(query).sort({ createdAt: 1}).lean()   
// }

// async function getRecent() {    
//     return Data.find().sort({ userCount: -1}).limit(3).lean();
// }

