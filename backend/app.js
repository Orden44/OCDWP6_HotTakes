// ---------- app.js
// Import Express
const express = require('express');
// Import mongoose
const mongoose = require('mongoose');
// Import path, donne accès au chemin de notre système de fichier
const path = require('path');
// import fichier config
const config = require('./config.js');

// Import des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const likeRoutes = require('./routes/like');

// Création de l'application express
const app = express();

// Connection base de données MongoDB à mongoose
mongoose.connect(`mongodb+srv://${config.MONGO_DB_USERNAME}:${config.MONGO_DB_PASSWORD}@cluster0.kotkden.mongodb.net/${config.MONGO_DB_NAME}?retryWrites=true&w=majority`, 

  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour résoudre problèmes de CORS et permettre l'accès à l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajoute les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Middleware qui permet l'accès au corps de la requête en objet javascript utilisable
app.use(express.json());

// Indique à Express qu'il faut gerer la ressource images de manière statique à chaque requête reçue vers la route /images
// __dirname est un sous-répertoire de notre répertoire de base
app.use('/images', express.static(path.join(__dirname, 'images')));

// Enregistrement des routeurs avec racine attendue par front-end
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/api/sauces', likeRoutes);

// Export de l'application
module.exports = app;