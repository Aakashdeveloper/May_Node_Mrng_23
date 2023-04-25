const express = require('express');
const app = express();
const port = 8811;

//routes
app.get('/',function(req,res){
    res.send('Hii From Express Default route')
})

app.get('/category',(req,res) => {
    res.send('This is catgeory Route')
})

app.get('/products',(req,res)=>{
    res.send('This is products Route')
})

//create server
app.listen(port,function(err){
    if(err) throw err;
    console.log('server listening on port 8811')
})