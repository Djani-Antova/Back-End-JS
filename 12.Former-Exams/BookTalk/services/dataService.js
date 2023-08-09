// const Data = require('../models/data.js');


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
//     existing.users.push(userId);
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
// }

// ======================================
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
//     existing.users.push(userId);
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
//     let alldata = await getAll();

//     if (nameSearch){
//         alldata = alldata.filter(alldata => alldata.name.toLowerCase().includes(nameSearch.toLowerCase()));
//     }

//     if (platformSearch){
//         alldata = alldata.filter(alldata => alldata.payment.toLowerCase() == platformSearch.toLowerCase());
//     }

//     return alldata;
// }


// async function getAll(){
//     const allAuction = await Data.find().lean()
//     return allAuction.filter(a=>a.isClosed==false)
// }
// async function getAllClose(){
//     const allAuction = await Data.find().populate('buyers').lean()
//     return allAuction.filter(a=>a.isClosed==true)
// }

// async function getRecent() {
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
//     create,
//     getbyId,
//     deletebyId,
//     updatebyId,
//     buy,
//     search
// }