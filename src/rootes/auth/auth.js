const jwt = require('jsonwebtoken')
const privateKey = require('../auth/cles_prive')

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['x-auth-token']
  // const authorizationHeader = req.headers.authorization
  console.log("ato am n auth")

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }

  const token = authorizationHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }

    const userId = decodedToken.userId
    if (req.body.id && req.body.id !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next()
    }
  })
}