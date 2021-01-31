const express = require('express');
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://localhost:27017');
const UserSchema = mongoose.Schema({ name: String, ip: String });
const User = mongoose.model('Users', UserSchema);

app.use((request, response, next) => {
    if (request.headers.iknowyoursecret !== 'TheOwlsAreNotWhatTheySeem') {
        return response.end('You do not know the secret');
    }
    next();
});

app.post('/', (request, response) => {
    const name = request.headers.name;
    if (!name) {
        return response.end('Who are you?');
    }
    const user = new User({ name: name, ip: request.connection.remoteAddress });
    user.save((error, savedUser) => {
        if (error) throw error;
        console.log(`Hello ${savedUser.name} with ${savedUser.ip}!`);
    })
    return response.end();
});

app.listen(8080, () => {
    User.find({}, (err, users) => {
        console.log(
            "In the collection at the moment",
            users.map((u) => u.name).join(" ")
        );
    })
});