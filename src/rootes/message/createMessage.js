const { ValidationError, UniqueConstraintError } = require('sequelize');
const { chat } = require('../../db/sequelize');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
//set state inbox mbola tsy vita
const multer = require('multer');
const inbox = require('../../models/inbox');

module.exports = (app) => {
    function generateUniqueId() {
        return uuidv4();
    }
    
    const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
    
        const publicPath = path.join(__dirname, '../../image');
        const directoryPath = path.join(publicPath, '/', "1");
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true }, (err) => {
              if (err) throw err;
              console.log('Dossier créé avec succès !');
            });
            } else {
                console.log('Le dossier "public/uploads" existe déjà.');
              }

      cb(null,directoryPath)
    },
    filename: (req, file, cb)=> {
      cb(null,  "1")
    }
  })
  const upload = multer({ storage: storage })

    app.post('/api/message',upload.single('image'), (req, res) => {
        let attach = "false";
    if(req.file!==undefined){
         attach="true";
    }
     const reqData = JSON.parse(req.body.reqData);

        const inboxId = reqData.value.inbox
        const messageE =  reqData.value.message//"Salut!"//req.body.roles;
        const sender = reqData.userData.id;
        const id = generateUniqueId();
        chat.create({ id: id, inbox_id: inboxId, user_uid: sender, message: messageE,attachement:attach })
            .then(User => {
                const publicPath = path.join(__dirname, '../../image');
                const oldPath = path.join(publicPath, '/', '1/1');
                const newPath = path.join(publicPath,'/',inboxId);
                const MnewPath = path.join(newPath,'/',User.id);
                if (!fs.existsSync(newPath)) {
                    fs.mkdirSync(newPath, { recursive: true }, (err) => {
                      if (err) throw err;
                      console.log('Dossier créé avec succès !');
                    });
                    } else {
                        console.log('Le dossier  existe déjà.');
                      }
                fs.rename(oldPath, MnewPath, (err) => {
                if (err) {
                    console.error(`Erreur lors du déplacement/renommage du fichier : ${err}`);
                } else {
                    console.log(`Le fichier ${oldPath} a été déplacé et renommé en ${MnewPath} avec succès !`);
                }
                });

                const message = 'L\'utilisateur a bien été inserer.'
                res.json({ message, data: User })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = 'La liste des client n\'a pas pu être récupérée. Réessayez dans quelques instaants.'
                res.status(500).json({ message, data: error })
            })
    })
}