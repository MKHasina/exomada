const bodyParser = require('body-parser');
const express = require('express');
const sequelize = require('./src/db/sequelize');
const config = require('./config/config');

const app = new express();
const server = require('http').createServer(app);
const port = config.production.server._PORT || config.development.server._PORT;



app

    .use(bodyParser.json())

sequelize.initDb();

app.get('/', (req, res) => res.json("mety ve"));


const io = require('socket.io')(server, {});

io.on('connection', (socket) => {
    socket.on('create-something', (value) => {

        console.log(value)
        socket.emit('foo', value);

    })
})


require('./src/rootes/auth/createUser')(app);
require('./src/rootes/auth/connexion')(app);
require('./src/rootes/auth/findAllUsers')(app);
//require('./src/rootes/message/createInbox')(app);
app.use(({ res }) => {
    const message = 'Impossble de trouver la ressource demandée! Vous povevez essayer une autre URL';
    res.status(404).json({ message });
})

server.listen(port, () => (console.log('mety' + port)))