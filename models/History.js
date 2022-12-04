
const mongoose=require('mongoose')
let historySchema=new mongoose.Schema({
    id:String,
    productId:String,
    empNum:String,
    branch:String,
    date:String,
    time:String

})
module.exports=mongoose.model('History',historySchema)


