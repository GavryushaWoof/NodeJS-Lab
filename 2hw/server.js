const http = require('http');
const fs = require('fs');
const url = require('url');


const info = 'info.json';

let info = [];
if (fs.existsSync(info)) {
    info = JSON.parse(fs.readFileSync(info, 'utf8'));
    console.log('>>> information read from file: ', info);
}

http.createServer((request, response) => {
    const queryObject = url.parse(request.url, true).query;
    const ip = request.connection.remoteAddress;

    console.log(request.method);
    if (
        request.method === 'POST' &&
        queryObject.name &&
        request.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem'
    ) {
        info.push({ name: queryObject.name, ip });
        fs.writeFile(info, JSON.stringify(info), (err) => {
            if (err) {
                throw err;
            }
        });
        console.log('I know your secret! -', request.headers.iknowyoursecret);
        response.end(`Hello, ${(info.map(item => item.name).join(', '))}!`);
    }
    response.end();
}).listen(3000);