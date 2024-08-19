// ---------- middleware/auth.js
// Import jwt (verification tokens)
const jwt = require('jsonwebtoken');
//import fichier de config
const config = require('../config.js');

// Middleware à appliquer à nos routes sauces à proteger
module.exports = (req, res, next) => {
    // try/catch car plusieurs élements peuvent poser problème, donc gerer chaque erreur
    try {
        // Récuperer le token dans le header authorization
        // avec split : retourne un tableau avec le mot clé'Bearer' en 1e element et le token en 2e element
        // on recupere seulement le 2è element de ce tableau : le token
        const token = req.headers.authorization.split(' ')[1];
        // on decode le token avec fonction verify de jwt, le token payload et sa clé secrète en argument
        // on enregistre le token décodé dans la variable "req" pour pouvoir retrouver les données de manière globale et dans les controllers
        req.token = jwt.verify(token, `${config.JWT_TOKEN_SECRET}`);
        // S'il y a un userId dans le corps de la requete et qu'il est différent du userId du token
       if (req.body.userId && req.body.userId !== req.token.userId) {
            // on n'authentifie pas la requête, retourne erreur dans le catch 
             throw 'UserId non valable !';
      } else {
            // s'il y a correspondance, on passe la requete au prochain middleware
            next();
       }
    } catch {
        // exceptions : on renvoi erreur 401 pour probleme d'authentificiation
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};