const express = require('express');
const app = express();
const port = 8811;
let {dbConnect} = require('./src/controller/dbContoller');



let menu = [
    {link:'/',name:'Home'},
    {link:'/category',name:'Category'},
    {link:'/products',name:'Products'}
]

const categoryRouter = require('./src/controller/categoryRouter')(menu);
const productRouter = require('./src/controller/productRouter')(menu);
//middleware supporting lib
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
    console.log('server listening on port 8811')
})