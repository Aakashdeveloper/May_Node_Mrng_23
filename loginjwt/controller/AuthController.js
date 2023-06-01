const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userScehma')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//register User
router.post('/register',(req,res) => {
    let hashpassword = bcrypt.hashSync(req.body.password,8)
    User.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:hashpassword,
        role:req.body.role?req.body.role:'User'
    },(err,result) => {
        if(err) return res.status(500).send(`There is problem in Registration`)
        res.status(200).send('Registration successful')
    })
})

router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) =>{
        if(err) return res.status(500).send({auth:false,token:'There is problem while login'});
        if(!user) return res.status(500).send({auth:false,token:'No User Found register first'});
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsValid) return res.status(401).send({auth:false,token:'Invalid Password'});
            var token = jwt.sign({id:user._id},config.secert,{expiresIn:86400});
            return res.status(200).send({auth:true,token:token});
        }
    })
})

//get User info
router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    jwt.verify(token,config.secert,(err,data) => {
        if(err) return res.status(500).send({auth:false,token:'Invalid Token Provided'});
        User.findById(data.id,(err,user) => {
            if(err) return res.status(500).send({auth:false,token:'Error Fetching user'});
            res.json(user)
        })
    })
})


// list all users
router.get('/users',(req,res) => {
    User.find({},(err,user) => {
        if(err) throw err;
        res.send(user)
    })
})


module.exports = router