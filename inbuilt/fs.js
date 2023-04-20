let fs = require('fs');

//write file
// fs.writeFile('mytext.txt','This file is first code',function(){
//     console.log('task done')
// })

//append file
fs.appendFile('mycode.txt','Code File line 1 \n',function(){
    console.log('file  created')
})