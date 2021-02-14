const http = require('http');
const fs = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

let student;

fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    student = JSON.stringify(JSON.parse(data));
});


const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200);
    res.end(student);
    
};

const server = http.createServer(requestListener);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
