const http = require('http');
const fs = require('fs');
const path = require('path');
const info = 'info.json';

http.createServer((request, response) => {
    let logs = JSON.parse(fs.readFileSync(path.resolve(__dirname, info), 'utf-8'));
    if (
        request.method === 'POST' &&
        request.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem'
    ) {
        logs.push({ name: request.headers.name, ip: request.connection.remoteAddress });
        fs.writeFile(path.resolve(__dirname, info), JSON.stringify(logs), (err) => {
            if (err) {
                throw err;
            }
        });
        console.log('I know your secret! -', request.headers.iknowyoursecret);
        console.log(`Hello, ${request.headers.name}`);
    }
    response.end();
}).listen(8080);