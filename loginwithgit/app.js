let express = require('express');
let app = express();
let request = require('request');
let superagent = require('superagent');
let cors = require('cors');
let port = process.env.PORT || 9111;
app.use(cors());

app.get('/',(req,res) => {
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=b1d4419959bc87b5a554">Login with Git</a>')
})

app.get('/profile',(req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success:false,
            message:'Code is Required'
        })
    }
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'b1d4419959bc87b5a554',
            client_secret:'7a429bb25994a6728598ec138a68af05b5294246',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            let access_token = result.body.access_token;
            const option = {
                uri:'https://api.github.com/user',
                method:'GET',
                headers: {
                    'Accept':'application/json',
                    'Authorization':`Bearer ${access_token}`,
                    'User-Agent':'mycode'
                }
            }
            request(option,(err,response,body) => {
                res.send(body)
            })
        })
})

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})