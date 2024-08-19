# "Hot Takes" OpenClassrooms Projet 6
# Construisez une API sécurisée pour une application d'avis gastronomiques
6ème projet du parcours développeur web d'OpenClassrooms

## General Info
But : construire le back-end (API) de la premiere version d'une application web de critique de sauces piquantes "Hot Takes" proposant une galerie de sauces, permettant de télécharger ses propres sauces et de liker/disliker les sauces que d'autres partagent.
L'API doit être construite selon des pratiques de code sécurisées.

Le front-end est fourni.

Compétences développées :        
➡ Implémenter un modèle logique de données conformément à la réglementation   
➡ Stocker des données de manière sécurisée   
➡ Mettre en œuvre des opérations CRUD de manière sécurisée   

Status : terminé

## Installation
dépendances à installer : 
- NodeJS 12.14 or 14.0.+
- Angular CLI 7.0.2.+
- node-sass

1. Cloner le dépôt
- Dans le dossier front-end "Web-Developer-P6" : run `npm install` et `npm install --save-dev run-script-os` puis Run `npm start` (voir README frontend)

2. Dans le dossier backend : 
- creer un dossier images
- creer un fichier development.env et un fichier production.env et y renseigner les variables d'environnement selon l'environnement dans lequel on se trouve:
    - NODE_ENV=development ou production
    - HOST=localhost
    - PORT=3000
    - MONGO_DB_USERNAME=username de votre base de donnée
    - MONGO_DB_PASSWORD=mot de passe de votre base de donnée
    - MONGO_DB_NAME=nom de votre base de donnée
    - JWT_TOKEN_SECRET=votre token secret
- run `npm install` puis 
run `npm start` ou `npm run dev` si environnement de développement 
`npm run production` si environnement de production


## Technologies & frameworks utilisés
- Javascript
- API REST Node.js / Express
- MongoDB



