const http = require("http");

http.createServer((req, res) => {
    console.log(req.headers)
    res.end();
}).listen(3000);