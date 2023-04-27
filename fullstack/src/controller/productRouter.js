const express = require('express');
const productRouter = express.Router();

// product route
productRouter.route('/')
    .get((req,res) => {
        res.send('This is products Route')
    })

productRouter.route('/details')
    .get((req,res) => {
        res.send('This is products details Route')
    })

module.exports = productRouter;