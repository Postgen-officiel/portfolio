const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();

// Définir la variable port
const port = 8000;

// Middleware pour servir des fichiers statiques depuis le répertoire 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Définir des routes pour vos pages
app.get('/', (req, res) => {
  const accueilHTML = fs.readFileSync(__dirname + "/public/accueil.html", "UTF-8");
  res.send(accueilHTML);
});

app.get('/about', (req, res) => {
  const aboutHTML = fs.readFileSync(__dirname + "/public/about.html", "UTF-8");
  res.send(aboutHTML);
});

app.get('/contact', (req, res) => {
  const projetsHTML = fs.readFileSync(__dirname + "/public/projets.html", "UTF-8");
  res.send(projetsHTML);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

