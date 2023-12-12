const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utiliser Pug comme moteur de modèle
app.set('view engine', 'pug');
app.set('views', './views'); // Définir le répertoire des fichiers Pug

// Route pour afficher le formulaire
app.get('/formulaire', (req, res) => {
  res.render('formulaire');
});

// Route pour traiter le formulaire soumis
app.post('/traitement-formulaire', (req, res) => {
  const { nom, prenom, email, telephone } = req.body;
  // Vous pouvez traiter les données du formulaire ici
  res.send(`Données reçues : Nom=${nom}, Prénom=${prenom}, Email=${email}, Téléphone=${telephone}`);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
