const http = require('http');
const fs = require('fs');


const info = 'info.json';


http.createServer((request, response) => {
    let logs = JSON.parse(fs.readFileSync(info, 'utf-8'));
    const queryObject = url.parse(request.url, true).query;
    const ip = request.connection.remoteAddress;

    console.log(request.method);
    if (
        request.method === 'POST' &&
        request.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem'
    ) {
        console.log('I know your secret! -', request.headers.iknowyoursecret);
        logs.push({ name: request.headers.name, ip: request.connection.remoteAddress });
        fs.writeFile(info, JSON.stringify(logs), (err) => {
            if (err) {
                throw err;
            }
        });
        response.end(`Hello, ${request.headers.name}`);
    }
    response.end();
}).listen(3000);