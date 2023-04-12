const crypto = require('crypto');

// Générer une clé de confirmation de courrier électronique aléatoire
exports.emailConfirmationKey = () => {
  const buffer = crypto.randomBytes(20); // Génère 20 octets aléatoires
  return buffer.toString('hex'); // Convertit les octets en une chaîne hexadécimale
}

//const  = generateEmailConfirmationKey(); // Appel de la fonction pour générer une clé

 //emailConfirmationKey;
  // Afficher la clé généréeconst emailConfirmationKey  =
