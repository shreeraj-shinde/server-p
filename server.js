http = require('http');     

port = 8081;


http.createServer((req , res) =>{
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('<h1>Hello World</h1>');
    res.end();

}).listen(port,() =>{
    console.log(`Server Running at ${port}`);
})