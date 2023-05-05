const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT || 8811;
const fs = require('fs');
const {dbConnect} = require('./src/controller/dbContoller');


let menu = [
    {link:'/',name:'Home'},
    {link:'/category',name:'Category'},
    {link:'/products',name:'Products'}
]

const categoryRouter = require('./src/controller/categoryRouter')(menu);
const productRouter = require('./src/controller/productRouter')(menu);
//middleware supporting lib
app.use(morgan('common',{stream:fs.createWriteStream('./app.log')}))

// static file path
app.use(express.static(__dirname+'/public'))
// html files path
app.set('views','./src/views')
// view engine name
app.set('view engine','ejs')

//routes
app.get('/',function(req,res){
    //res.send('Hii From Express Default route')
    res.render('index',{title:'Home Page',menu})
})

app.use('/category',categoryRouter)
app.use('/products',productRouter)

//create server
app.listen(port,function(err){
    if(err) throw err;
    dbConnect()
    console.log(`server listening on port ${port}`)
})