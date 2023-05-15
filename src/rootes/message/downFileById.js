const path = require('path');
module.exports = (app) => {
    app.get('/api/image/inbox/:inbox/message/:id', (req, res) => {

         const inboxId = req.params.inbox;
        const messageId = req.params.id;
 
try{
        const filePath = path.join(__dirname, '../../image');
        const inboxPath = path.join(filePath, '/',inboxId);
        const messagePath = path.join(inboxPath, '/',messageId);
        res.sendFile(messagePath);
    }catch(error){ 
                    const message = 'L\'utilisateur n\'a pas pus être connecté. Réessayez dans quelques instants.';
                    return res.status(500).json({ message, data: error });
                } 
        }
    )
}