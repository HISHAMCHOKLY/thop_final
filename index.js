require('dotenv').config()
const express = require('express')
const app=express()
const cookieParser=require('cookie-parser')

const connectDb=require('./config/database')
connectDb()

app.set('view engine','ejs')
app.use(express.static('static'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

let homeRoute=require('./routes/homeRoute')


app.use('/',homeRoute)



app.listen(process.env.PORT,()=>{
    console.log('connected on 4000');
})