let express = require('express');
let app = express();
let mongo = require('mongodb');
let dotenv = require('dotenv');
dotenv.config();
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT;
let {dbConnect,getData,getDataSort,getDataSortLimit
    ,postData,updateData,deleteData}  = require('./controller/dbController')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//get heart beat
app.get('/',(req,res) => {
    res.status(200).send('Health Ok')
})

//list of city
app.get('/location',async (req,res) => {
    let query = {};
    let collection = 'location';
    let output = await getData(collection,query)
    res.send(output)
})


// list of restaurants
app.get('/restaurants',async (req,res) => {
    let query = {};
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);
    
    if(stateId && mealId){
        query={
            state_id:stateId,
            "mealTypes.mealtype_id":mealId
        }
    }
    else if(stateId){
        query={
            state_id:stateId
        }
    }else if(mealId){
        query={
            "mealTypes.mealtype_id":mealId
        }
    }
    let collection = 'restaurants';
    let output = await getData(collection,query)
    res.send(output)
})

//list of meals
app.get('/meals',async(req,res) => {
    let query = {};
    let collection = 'mealType';
    let output = await getData(collection,query)
    res.send(output)
})

//filters
app.get('/filters/:mealId',async(req,res)=>{
    let query = {};
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let sort = {cost:1}
    let skip = 0;
    let limit = 1000000000
    if(req.query.sort){
        sort={cost:req.query.sort}
    }
    if(req.query.skip && req.query.limit){
        skip=Number(req.query.skip);
        limit=Number(req.query.limit)
    }
    if(cuisineId){
        query = {
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    }else if(lcost && hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }else if(mealId){
        query={
            "mealTypes.mealtype_id":mealId,
        }
    }
    let collection = 'restaurants';
    let output = await getDataSortLimit(collection,query,sort,skip,limit)
    res.send(output)
})

//restauratns details
app.get('/details/:id',async(req,res) => {
    let _id = mongo.ObjectId(req.params.id)
    let query = {_id}
    let output = await getData('restaurants',query)
    res.send(output)
})

//menu details
app.get('/menu/:id',async(req,res) => {
    let id = Number(req.params.id)
    let query = {restaurant_id:id}
    let output = await getData('menu',query)
    res.send(output)
})

//orders
app.get('/orders',async(req,res) => {
    let query = {};
    if(req.query.email){
        query={email:req.query.email}
    }
    let collection = 'orders';
    let output = await getData(collection,query)
    res.send(output)
})

//placeorder
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    let collection = 'orders';
    let response = await postData(collection,data)
    res.send(response)
})

//menu details {"id":[4,2,6]}
app.post('/menuDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {menu_id:{$in:req.body.id}}
        let collection = 'menu';
        let output = await getData(collection,query)
        res.send(output)
    }else{
        res.send('Please pass data as array like {"id":[4,6,7]}')
    }
})

//updateOrder
app.put('/updateOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateData(collection,condition,data);
    res.send(output)
})

//delete order
app.delete('/deleteOrder',async(req,res) => {
    let collection = 'orders';
    let query = {"_id":mongo.ObjectId(req.body._id)};
    let rowcount = await getData(collection,query);
    if(rowcount.length > 0 ){
        let response = await deleteData(collection,query)
        res.send(response)
    }else{
        res.send('No Order found')
    }
})

app.listen(port,() => {
    dbConnect()
    console.log(`listening on port ${port}`)
})
