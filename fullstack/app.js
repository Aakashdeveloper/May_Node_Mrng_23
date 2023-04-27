const express = require('express');
const app = express();
const port = 8811;
const categoryRouter = require('./src/controller/categoryRouter')
const productRouter = require('./src/controller/productRouter')

//routes
app.get('/',function(req,res){
    res.send('Hii From Express Default route')
})

app.use('/category',categoryRouter)
app.use('/products',productRouter)

//create server
app.listen(port,function(err){
    if(err) throw err;
    console.log('server listening on port 8811')
})