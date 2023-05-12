const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 9877;

//static file
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/upload',(req,res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,function(err,field,files){
        let oldPath = files.uimage.filepath;
        let newPath = `${__dirname}/public/images/${files.uimage.originalFilename}`;
        fs.rename(oldPath,newPath,function(err){
            if(err) throw err;
            res.render('display',{title:req.body.iname,image:`${files.uimage.originalFilename}`})
        })
    })
})

app.listen(port,(err) => {
    console.log(`Running on port ${port}`)
})