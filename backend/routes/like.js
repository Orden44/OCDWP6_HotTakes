//---------- routes/like.js
// Import express
const express = require('express');
// Création du routeur
const router = express.Router();
// Import middleware d'authentification à utiliser sur toutes les routes
const auth = require('../middleware/auth');
// Import du controller user
const likeCtrl = require('../controllers/like');

// Traitement de l'option like/dislike
router.post('/:id/like', auth, likeCtrl.likeStatus);

// Export des routes
module.exports = router;