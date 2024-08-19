// ---------- models/user.js
// Import mongoose
const mongoose = require('mongoose');
// Import de l'unique validator
const uniqueValidator = require('mongoose-unique-validator');

// Création schéma de données de l'user, contient champs souhaités pour chaque User
// indique le type et le caractère obligatoire ou non pour chaque attribut de l'objet
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Validator appliqué au schéma, on ne pourra pas avoir plusieurs users avec même adresse email et mot de passe
userSchema.plugin(uniqueValidator);

// exporte en tant que modèle
module.exports = mongoose.model('User', userSchema);