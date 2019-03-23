const os = require('os');
const fs = require('fs');
const fileName = __dirname +'/test.txt';
const http = require('http');



console.log("Hello world!");
console.log('Architecture ' +os    .arch());
console.log('CPUs ' + os.cpus().length);
console.log('OS Platform ' + os.platform());


//Read the file using
// readFile asynchronous method and print the content of the file
// to console.
fs.readFile(fileName, (err, data) => {
            if(err) {
                console.error(err);
            }
            console.log(data.toString());

});


//Use the readFileSync method to read the file synchronously
const data = fs.readFileSync(fileName);
console.log(data.toString());


//Use streams to copy content of a file.
const outFileName = __dirname + '/test-copy.txt';
const readStream  = fs.createReadStream(fileName);
const writeStream = fs.createWriteStream(outFileName);
readStream.pipe(writeStream);

readStream.on( 'data' , data => {
    console.log(data.toString());
});



//Optionally add a POST request that accepts form field name and return HTML
// with Hello {name}

// http.createServer((req,res) =>  {
//     res.setHeader('Content-Type', 'text/html');
//     res.write(`<h1>Hellow world app 1</h1>`);
//     res.end();
//
// }).listen(3000);

http.createServer((req, res) => {
        res.setHeader('Content-Type', 'text/html');
        switch(req.method) {
            case 'GET' : res.write('<h1>Hello World</h1>');
                res.end();
                break;
            case 'POST' :
                req.on('data', data => {
                        res.write('<h1>Hello '+ data +'</h1>');
                        res.end();
                    });
                break;
        }
    }).listen(3000, (err) => {
        console.log('Server is listening to port 3000')
    });
