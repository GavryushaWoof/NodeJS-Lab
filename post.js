const myArgs = process.argv.slice(2);
const http = require("http");
const options = {
    method: 'POST',
    host: myArgs[0],
    port: myArgs[2],
    path: myArgs[1],
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
const req = http.request(options, callback);
req.write("hello everyone!");
req.end();