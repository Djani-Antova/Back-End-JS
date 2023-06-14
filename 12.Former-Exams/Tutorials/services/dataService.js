const Data = require('../models/data.js');

async function getAllByDate(search){ 
    const query = {};
    if(search) {
       query.title = new RegExp(search, 'i')
    }
   
    return Data.find(query).sort({ createdAt: 1}).lean()   
}

async function getRecent() {    
    return Data.find().sort({ userCount: -1}).limit(3).lean();
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

    existing.title = data.title;
    existing.description = data.description;
    existing.imageUrl = data.imageUrl;
    existing.duration = data.duration; 
   
    return existing.save();
}
async function buy(dataId, userId){
    const existing = await Data.findById(dataId);
    existing.users.push(userId);
    existing.userCount++;
    return existing.save();
}

module.exports = { 
    getAllByDate, 
    create,
    getRecent,
    getbyId,
    deletebyId,      
    updatebyId,
    buy, 
}
