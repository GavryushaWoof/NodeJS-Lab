const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const info = 'info.json';

app.use((request, response, next) => {
    if (request.headers.iknowyoursecret !== 'TheOwlsAreNotWhatTheySeem') {
        return response.end('You do not know the secret');
    }
    next();
});

app.post('/', (request, response) => {
    let logs = JSON.parse(fs.readFileSync(path.resolve(__dirname, info), 'utf-8'));
    const name = request.headers.name;
    if (!name) {
        return response.end('Who are you?');
    }
    logs.push({ name: name, ip: request.connection.remoteAddress });
    fs.writeFile(path.resolve(__dirname, info), JSON.stringify(logs), (err) => {
        if (err) {
            throw err;
        }
    });
    response.send(`Hello, ${request.headers.name}!`);
    return response.end();
});

app.listen(8080, (err) => {
    if (err) {
        return console.log('An error has occurred', err);
    }
});