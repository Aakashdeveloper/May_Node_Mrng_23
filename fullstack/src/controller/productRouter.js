const express = require('express');
const productRouter = express.Router();
const {getData}  = require('./dbContoller')

function router(menu){
    // product route
    productRouter.route('/')
        .get(async (req,res) => {
            let query = {}
            let products = await getData('products',query)
            res.render('product',{title:'Products Page',products:products,menu})
            //res.send(products)
        })

    
    productRouter.route('/category/:id')
        .get(async function(req,res){
            // let id = req.params.id
            let {id} = req.params
            let query = {"category_id":Number(id)}
            let products = await getData('products',query)
            res.render('product',{title:'Products Listing Page',products:products,menu})
        })

    productRouter.route('/details')
        .get((req,res) => {
            res.send('This is products details Route')
    })

    return productRouter
}



module.exports = router;