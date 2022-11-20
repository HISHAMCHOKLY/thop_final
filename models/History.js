
const mongoose=require('mongoose')
let historySchema=new mongoose.Schema({
    id:String,
    productId:String,
    empNum:String,
    showDate:String,
    showTime:String

})
module.exports=mongoose.model('History',historySchema)


