let History=require('../models/History')

exports.getHome=(req,res)=>{
    res.render('home')
}

exports.getAddItem=(req,res)=>{
    res.render('addItem')
}
exports.addItem=async(req,res)=>{
    let {productid,empNum}=req.body
    let offset=+5.5 //india time zone code this code get from (https://timezonedb.com/time-zones)
    var date = new Date();
    var utc=date.getTime()+(date.getTimezoneOffset()*60000)
    var nd=new Date(utc+(3600000*offset))
    let today=nd.toLocaleString().split(',')
    var current_date = new Date().toISOString().slice(0, 10);
    var current_time = today[1]
    await History.create({id:Date.now(),productId:productid,empNum:empNum,showDate:current_date,showTime:current_time})
    res.redirect('/addItem')
}

exports.getDateFilter=async(req,res)=>{
    let data=[]
    res.render('dateFilter',{data})

}
exports.dateFilter=async(req,res)=>{
    let {start,end}=req.body
    let data=await History.find({ //query today up to tonight
        showDate: {
            $gte: start, 
            $lte: end
        }
    })
    res.render('dateFilter',{data})
}

exports.getEmpFilter=async(req,res)=>{
    let data=[]
    res.render('empFilter',{data})
}
exports.empFilter=async(req,res)=>{
    let {empNum,start,end}=req.body
    let data=await History.find({empNum:empNum,showDate: {
        $gte: start, 
        $lte: end
    }})
    res.render('empFilter',{data})
}
exports.getHistory=async(req,res)=>{
    let history=await History.find()
    history.reverse()
    res.render('history',{history})
}



exports.clearAllData=async(req,res)=>{
    await History.deleteMany()
    res.redirect('/')
}