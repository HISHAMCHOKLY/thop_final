const User=require('../models/User')
const cookieToken=require('../utils/cookieToken')
const jwt=require('jsonwebtoken')


exports.getRegister=async(req,res)=>{
    res.render('register')
}

exports.register=async(req,res)=>{
    let {username,password}=req.body
    await User.create({username:username,password:password})
        res.redirect('/login')

}
exports.getLogin=(req,res)=>{
    res.render('login')
}
exports.login=async(req,res)=>{
    let {username,password}=req.body
    let user=await User.findOne({username:username}).select('+password')
    if(!user){
        return res.redirect('/login')
    }
    let isPasswordCorrect=await user.isValidatedPassword(password)
    if(!isPasswordCorrect){
        return res.redirect('/login')
    }
    cookieToken(user,res)
}
exports.logout = async (req,res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).redirect('/')
}