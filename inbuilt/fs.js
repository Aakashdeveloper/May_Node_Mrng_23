let fs = require('fs');

//write file
// fs.writeFile('mytext.txt','This file is first code',function(){
//     console.log('task done')
// })

//append file
// fs.appendFile('mycode.txt','Code File line 1 \n',function(){
//     console.log('file  created')
// })

//read file
// fs.readFile('db.json','utf-8',function(err,data){
//     if(err) throw err;
//     console.log(data)
// })

//rename
// fs.rename('mycode.txt','mydata.txt',function(err){
//     if(err) throw err;
//     console.log('File renamed')
// })

// //delete
// fs.unlink('mydata.txt',function(err){
//     if(err) throw err;
//     console.log('File deleted')
// })

let data1 = fs.readFileSync('mytext.pdf','utf-8')
console.log(data1)

let data = fs.readFileSync('db.json','utf-8')
console.log(data)

