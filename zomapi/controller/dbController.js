let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.MongoUrl;
let db;

function dbConnect(){
    MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,client) => {
        if(err) console.error(`Error while connecting to mongo`)
        db = client.db('internfeb')
    })
}

async function getData(colName,query){
    let output ;
    try{
        output = await db.collection(colName).find(query).toArray()
    } catch (err){
        output = {"error":"Error in Condition for getData"}
    }
    return output
}

async function getDataSort(colName,query,sort){
    let output ;
    try{
        output = await db.collection(colName).find(query).sort(sort).toArray()
    } catch (err){
        output = {"error":"Error in Condition for getDataSort"}
    }
    return output
}


async function getDataSortLimit(colName,query,sort,skip,limit){
    let output ;
    try{
        output = await db.collection(colName).find(query).sort(sort).skip(skip).limit(limit).toArray()
    } catch (err){
        output = {"error":"Error in Condition for getDataSortLimit"}
    }
    return output
}


async function postData(colName,data){
    let output ;
    try{
        output = await db.collection(colName).insert(data)
    } catch (err){
        output = {"error":"Error in Condition for postData"}
    }
    return output
}

async function updateData(colName,condition,data){
    let output ;
    try{
        output = await db.collection(colName).update(condition,data)
    } catch (err){
        output = {"error":"Error in Condition for updateData"}
    }
    return output
}

async function deleteData(colName,condition){
    let output ;
    try{
        output = await db.collection(colName).remove(condition)
    } catch (err){
        output = {"error":"Error in Condition for deleteData"}
    }
    return output
}


module.exports = {
    dbConnect,
    getData,
    getDataSort,
    getDataSortLimit,
    postData,
    updateData,
    deleteData
}