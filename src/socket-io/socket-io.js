
const { messageReC } = require('../helper/helper');
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('user-data', (userData) => {
            console.log(userData);
            messageReC(userData.id)
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

        })

         socket.on('sendVideo', (videoData) => {
    // Diffusion de la vidéo reçue à tous les autres participants
            console.log("0120")

    socket.broadcast.emit('receiveVideo', videoData);
  });
    })

}