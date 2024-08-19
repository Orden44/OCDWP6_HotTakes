// ---------- routes/sauces.js
// Import express
const express = require('express');
// Création du routeur
const router = express.Router();
// Import du controller sauce
const saucesCtrl = require('../controllers/sauces');
// Import middleware d'authentification à utiliser sur toutes les routes
const auth = require('../middleware/auth');
// Import middleware multer pour gestion enregistrement images, après 'auth'
const multer = require('../middleware/multer-config');

// Routes avec actions CRUD disponibles
// Création d'une sauce
router.post('/', auth, multer, saucesCtrl.createSauce);
// Modification d'une sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
// Suppression d'une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce);
// Récupération (lecture) toutes les sauces
router.get('/', auth, saucesCtrl.getAllSauces);
// Récupération (lecture) une sauce selon son id (id automatique de mongoose)
router.get('/:id', auth, saucesCtrl.getOneSauce);

// Export des routes
module.exports = router;