const express = require('express');
const categoryRouter = express.Router();

//default route of category
categoryRouter.route('/')
    .get((req,res) => {
        res.send('This is catgeory Route')
    })

categoryRouter.route('/details')
    .get((req,res) => {
        res.send('This is catgeory details Route')
    })

module.exports = categoryRouter;