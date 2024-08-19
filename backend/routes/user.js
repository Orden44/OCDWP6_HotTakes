// ---------- routes/user.js
// Import express
const express = require('express');
// Création du routeur
const router = express.Router();

// Import du controller user
const userCtrl = require('../controllers/user');

// Routes POST car le front-end envoie l'adresse mail et mdp
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Export des routes
module.exports = router;