let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT;
let {dbConnect,getData}  = require('./controller/dbController')
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.MongoUrl;
let db;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//get heart beat
app.get('/',(req,res) => {
    res.status(200).send('Health Ok')
})

//list of city
app.get('/location',async (req,res) => {
    db.collection('location').find({}).toArray((err,data) => {
        if(err) throw err;
        res.status(200).send(data)
    })
})


app.listen(port,() => {
    MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,client) => {
        if(err) console.error(`Error while connecting to mongo`)
        db = client.db('internfeb')
    })
    console.log(`listening on port ${port}`)
})