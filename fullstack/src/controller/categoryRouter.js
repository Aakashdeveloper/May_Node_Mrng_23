const express = require('express');
const categoryRouter = express.Router();
const {getData}  = require('./dbContoller')

function router(menu){
    //default route of category
    categoryRouter.route('/')
        .get(async (req,res) => {
            let query = {}
            let data = await getData('catgeory',query)
            res.render('category',{title:'Category Page',data,menu})
        })

    categoryRouter.route('/details')
        .get((req,res) => {
            res.send('This is catgeory details Route')
        })

    return categoryRouter

}

module.exports = router;