const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
let userSchema=new mongoose.Schema({
    id:String,
    username:String,
    password:{
        type:String
    }

})


userSchema.pre('save',async function(next){
    if(!(this.isModified('password'))){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
})
userSchema.methods.isValidatedPassword=async function(userSendPassword){
    return await bcrypt.compare(userSendPassword,this.password)
}

userSchema.methods.getJwtToken=function(){
    return jwt.sign(
        {
            id:this.id,
            username:this.username
        },process.env.JWT_SECRET,
        {expiresIn:'8h'}
    )
}



module.exports=mongoose.model('User',userSchema)