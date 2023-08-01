const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const chessGame = fs.readFileSync('./index.html', 'utf8');

console.log(chessGame)

const server = http.createServer((req, res)=> {
    console.log(req.url)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(chessGame)
});

server.listen(port, hostname, ()=>{
    console.log(`listening to https://${hostname}:${port}`)
})