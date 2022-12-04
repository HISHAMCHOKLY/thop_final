let History=require('../models/History')

exports.getHome=(req,res)=>{
    res.render('home')
}

exports.getAddItem=(req,res)=>{
    res.render('addItem')
}
exports.addItem=async(req,res)=>{
    let {productid,empNum,branch}=req.body
    var current = new Date();
    let currentDate = new Date().toJSON().slice(0, 10);
	var current_time = current.toLocaleTimeString();
    await History.create({id:Date.now(),productId:productid,empNum:empNum,branch:branch,date:currentDate,time:current_time})
    res.redirect('/addItem')
}

exports.getDateFilter=async(req,res)=>{
    let data=[]
    let start,end=''
    res.render('dateFilter',{data,start,end})

}
exports.dateFilter=async(req,res)=>{
    let {start,end}=req.body
    let data=await History.find({ //query today up to tonight
        date: {
            $gte: start, 
            $lte: end
        }
    })
    data.reverse()
    res.render('dateFilter',{data,start,end})
}

exports.getEmpFilter=async(req,res)=>{
    let data=[]
    let start,end,empNum=''
    res.render('empFilter',{data,start,end,empNum})
}
exports.empFilter=async(req,res)=>{
    let {empNum,start,end}=req.body
    let data=await History.find({empNum:empNum,date: {
        $gte: start, 
        $lte: end
    }})
    data.reverse()
    res.render('empFilter',{data,start,end,empNum})
}
exports.getBranchFilter=async(req,res)=>{
    let data=[]
    let start,end,branch=''
    res.render('branchFilter',{data,branch,start,end})
}

exports.branchFilter=async(req,res)=>{
    let {branch,start,end}=req.body
    let data=await History.find({branch:branch,date: {
        $gte: start, 
        $lte: end
    }})
    data.reverse()
    res.render('branchFilter',{data,start,end,branch})
}
exports.getHistory=async(req,res)=>{
    let history=await History.find()
    history.reverse()
    res.render('history',{history})
}

exports.deleteHistory=async(req,res)=>{
    let id=req.params.id
    await History.deleteOne({id:id})
    res.redirect('/history')
}



exports.clearAllData=async(req,res)=>{
    await History.deleteMany()
    res.redirect('/')
}