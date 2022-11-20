const jwt=require('jsonwebtoken')

exports.isLoggedin = async (req,res,next)=>{
    const token = req.cookies.token
    
    if(token){
        try{
            const decoded =await jwt.verify(token,process.env.JWT_SECRET)
            req.username=decoded.username
            next()
        }catch(err){
            res.status(403).send({
                success:false,
                message:err
                
            })
        }
    }else{
        return res.redirect('/login')
    }
}