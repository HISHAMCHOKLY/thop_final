const cookieToken=async(user,res)=>{
    let goto='/'
    const token =  await user.getJwtToken()
    const options = {
        expires: new Date(Date.now()+7*60*60*1000),
        httpOnly:true
    }
    return res.cookie('token', token ,options).redirect(`${goto}`)
}

module.exports = cookieToken