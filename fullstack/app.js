const express = require('express');
const app = express();
const port = 8811;
const categoryRouter = require('./src/controller/categoryRouter');
const productRouter = require('./src/controller/productRouter');

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
    res.render('index',{title:'Home Page'})
})

app.use('/category',categoryRouter)
app.use('/products',productRouter)

//create server
app.listen(port,function(err){
    if(err) throw err;
    console.log('server listening on port 8811')
})