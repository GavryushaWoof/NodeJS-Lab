const http = require("http");
const options = {
    path: "/",
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