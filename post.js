const http = require("http");
const options = {
    path: "/post",
    method: 'POST'
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