const myArgs = process.argv.slice(2);
const http = require("http");
const options = {
    host: myArgs[0],
    port: myArgs[2],
    path: myArgs[1],
    method: "GET",
};
const callback = (response) => {
    let str = '';
    response.on('data', (chunk) => {
        str += chunk;
    });
    response.on('end', () => {
        console.log(str);
    });
}
http.request(options, callback).end();