
const { messageReC } = require('../helper/helper');
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('user-data', (userData) => {
            messageReC(userData.user_uid)
                .then(inbox =>
                    inbox.map(inb => {
                        socket.join(inb.id);
                    }
                    )

                )
        })

        socket.on('create-something', (value) => {


            console.log(value)
            socket.to(value.inbox).timeout(3000).emit('foo', value);
            setTimeout(() => {
                console.log("5 secondes se sont écoulées depuis la réponse");
            }, 5000);
            socket.to(value.inbox).timeout(5000).emit('foory', value);

        })
    })

}