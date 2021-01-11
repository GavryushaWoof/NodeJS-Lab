const myArgs = process.argv.slice(2);
const http = require("http");
const options = {
    method: "POST",
    host: myArgs[0],
    port: myArgs[2],
    path: myArgs[1],
    headers: { "IKnowYourSecret": "TheOwlsAreNotWhatTheySeem" }
}
const params = {
    name: 'Name',
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
const req = http.request(options, params, callback);
req.write("hello everyone!");
req.end();