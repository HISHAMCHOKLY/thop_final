const express = require('express')
const { getAddItem, getHome, getInventory, getHistory, addItem, clearAllData, getMonthPage, monthFilter, monthPage, getDateFilter, dateFilter, getEmpFilter, empFilter } = require('../controllers/home')
const { getLogin, login, logout, getRegister, register } = require('../controllers/user')
const { isLoggedin } = require('../middlewares/user')
const router=express.Router()


router
    .route('/')
    .get(isLoggedin,getHome) 

router
    .route('/login')
    .get(getLogin)
    .post(login)

router
    .route('/logout')
    .get(logout)

router
    .route('/register')
    .get(getRegister)
    .post(register)

router    
    .route('/addItem')
    .get(isLoggedin,getAddItem)
    .post(addItem)

router
    .route('/dateFilter')
    .get(isLoggedin,getDateFilter)
    .post(dateFilter)

router
    .route('/empFilter')
    .get(isLoggedin,getEmpFilter)
    .post(empFilter)    

router
    .route('/history')
    .get(isLoggedin,getHistory)   
router
    .route('/clear')
    .get(isLoggedin,clearAllData)    
    



module.exports=router
