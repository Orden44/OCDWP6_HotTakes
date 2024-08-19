//---------- controllers/like.js
// Import du modèle sauce
const Sauce = require('../models/Sauce');

// Gestion des likes
exports.likeStatus = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;

    // Recherche de la sauce sélectionnée
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Vérification si l'user a déjà aimé pour éviter de liker plusieurs fois 
            // (==≠Son id est dans le tableau usersLiked)
            let userLike = sauce.usersLiked.find(id => id === userId);
            // Vérification si l'user a déjà disliké
            let userDislike = sauce.usersDisliked.find(id => id === userId);

            switch (like) {
                // Si like = 1, l'utilisateur aime
                case 1 :
                    // Si l'utilisateur n'a pas encore liké
                    // on ajoute un like et l'userId dans le tableau correspondant
                    if (!userLike) {
                        sauce.likes += 1;
                        sauce.usersLiked.push(userId);
                    } else {
                        // Si l'utilisateur a déjà liké, on envoi une erreur
                        throw new Error('un seul like possible!');
                    } 
                break;

                // Si like = 0, l'utilisateur annule son like
                case 0 :
                    // Si l'utilisateur a déjà liké, 
                    // on retire le like et le userId du tableau (on garde ceux qui ont un id différents)
                    if (userLike) {
                        sauce.likes -= 1;
                        sauce.usersLiked = sauce.usersLiked.filter(id => id !== userId);
                    }
                    // Si l'uitlisateur a déjà disliké, 
                    // on retire le dislike et le userId du tableau
                    else {
                        if (userDislike) {
                        sauce.dislikes -= 1;
                        sauce.usersDisliked = sauce.usersDisliked.filter(id => id !== userId);
                        }   
                    }
                break;

                // Si like = -1, l'utilisateur n'aime pas
                case -1 :
                    // Si l'user n'a pas encore disliké
                    // on ajoute 1 dislikes et l'userId dans le tableau correspondant
                    if (!userDislike) {
                        sauce.dislikes += 1;
                        sauce.usersDisliked.push(userId);
                    } else {
                        // Si l'utilisateur a déjà disliké, on envoi une erreur
                        throw new Error('un seul dislike possible !');
                    } 
            }
            // Sauvegarde la sauce avec like/dislike modifiés
            sauce.save()
                .then(() => res.status(201).json({ message: 'préférence enregistrée !' }))
                .catch(error => res.status(400).json({ error }));

            })
        .catch(error => res.status(500).json({ error : error.message }));
};