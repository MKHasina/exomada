const express = require('express');
const app = new express();
const server = require('http').createServer(app);

const sequelize = require('./src/db/sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');

const PORT = config.production.server.port || 3007;

app
    .use(bodyParser.json())
    .use(cors({ origin: true }))

sequelize.initDb();

app.get('/', (req, res) => res.json("mety ve"));


const io = require('socket.io')(server, {
    cors: true
});

require('./src/socket-io/socket-io')(io);

require('./src/rootes/auth/createUser')(app);
require('./src/rootes/auth/connexion')(app);
require('./src/rootes/auth/findAllUsers')(app);
require('./src/rootes/auth/updateUser')(app);
require('./src/rootes/message/createInbox')(app);
require('./src/rootes/message/FindInboxById')(app);
require('./src/rootes/message/createMessage')(app);
require('./src/rootes/message/FiPartbyInb')(app);
require('./src/rootes/user/FindOneUByUID')(app);
require('./src/rootes/message/FindAllInboxes')(app);


app.use(({ res }) => {
    const message = 'Impossble de trouver la ressource demandée! Vous povevez essayer une autre URL';
    res.status(404).json({ message });
})

server.listen(PORT, () => (console.log('Lancer port:' + PORT)))