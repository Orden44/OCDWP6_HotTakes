// ---------- controllers/user.js
// Import de bcrypt pour chiffrer les mots de passe
const bcrypt = require('bcrypt');
// Import jsonwebtoken
const jwt = require('jsonwebtoken');
// Import du modèle utilisateur
const User = require('../models/User');
// import fichier config
const config = require('../config.js');

// Infrastructure nécessaire pour les routes d'authentification
// Fonction signup pour l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    // Fonction asynchrone de cryptage du mot de passe 
    // avec le mot de passe du corps de la requête passée par le front-end et le nombre d'éxécution en argument
    bcrypt.hash(req.body.password, 10)
    // Récupération du hash, 
        .then(hash => {
            // On enregistre le hash dans un nouveau user avec l'email de la requête
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Enregistrement de l'user dans la base de donnée
            user.save()
                // message de réussite renvoyé en json, code 201 : requête réussie + création de source
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                // ou message en cas d'erreur, code 400 mauvaise requete du client
                .catch(error => res.status(400).json({ error }));
        })
        // message erreur code 500 : erreur serveur
        .catch(error => res.status(500).json({ error }));
};

// Fonction login pour connecter les users existants
exports.login = (req, res, next) => {
    // Recherche de l'user dans la base de donnée qui correspond à l'email entré 
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log("user - "+user)
            // Si on ne trouve pas l'user, on renvoie un 401 pour dire non autorisé
            if (!user) {
                return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            } 
            // On utilise bcrypt pour comparer les hash, le mdp envoyé avec la requête et le hash enregistré dans database
            bcrypt.compare(req.body.password, user.password)
            // dans then on recoit un boolean pour savoir si valable ou non
            .then(valid => {
                console.log("valid - "+valid)
                // Si false, invalide : message code 401 Unauthorized
                if (!valid) {
                    return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                }
                // si true, renvoi statut 200 = bonne connexion et renvoi son userId et 1 token au front-end
                res.status(200).json({
                    userId: user._id,
                    // on appelle la fonction sign de jsonwebtoken pour encoder un nouveau token
                    token: jwt.sign(
                        // ID de l'user en tant que données à encoder dans le token, pour être sur que la requete correspond bien à l'userId
                        { userId: user._id },
                        // clé secrete pour l'encodage
                        `${config.JWT_TOKEN_SECRET}`,
                        // expiration du token, au bout de 24h l'user doit se reconnecter
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};