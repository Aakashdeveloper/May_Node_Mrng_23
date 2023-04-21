let http = require('http');

//req > what we send to server(params,queryParams,body)
//res > waht server will respond

let server = http.createServer(function(req,res){
    res.write('<h1>Hii from NodeJs server</h1>');
    res.end()
})

server.listen(6551)