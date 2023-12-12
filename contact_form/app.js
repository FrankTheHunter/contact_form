const express = require('express');
const app = express();
const port = 3000;

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Middleware pour traiter les requêtes URL encodées
app.use(express.urlencoded({ extended: true }));

// Route principale
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Exemple de route avec des paramètres
app.get('/greet/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}!`);
});

// Exemple de route POST
app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  res.json({ response: `Received message: ${message}` });
});

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
