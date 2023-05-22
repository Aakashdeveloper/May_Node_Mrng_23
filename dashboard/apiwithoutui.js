const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const Mongo = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function main(){
    await client.connect()
}

const collection = client.db('internfeb').collection('dashboard');
const bodyParser = require('body-parser')
const cors = require('cors');
const port = process.env.PORT || 7710;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/health',(req,res) => {
    res.send('Health Ok')
})

app.post('/addUser',async(req,res)=>{
    await collection.insertOne(req.body);
    res.send('Data Added')
})

app.get('/users',async(req,res)=>{
    const output = [];
    let query = {};
    if(req.query.city){
        query={
            city:req.query.city,
            isActive:true
        }
    }else if(req.query.isActive){
        let isActive = req.query.isActive;
        if(isActive == "false"){
            isActive = false
        }else{
            isActive = true;
        }
        query = {isActive}
    }else{
        query = {isActive:true}
    }
    const cursor = collection.find(query);
    for await(const data of cursor){
        output.push(data)
    }
    cursor.closed;
    res.send(output)
})

app.listen(port,() => {
    main();
    console.log(`Running on port ${port}`)
})