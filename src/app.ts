import express from 'express'
import { Pool } from 'pg'
const app = express();
const port = 3000;

const pool = new Pool({
    database: 'contact_form',
    password: "password",
    user: "root",
    host: "localhost"
});
(async () => {
    const client = await pool.connect()

    try {
        const res = await client.query(`CREATE TABLE IF NOT EXISTS contact (
            contact_id serial PRIMARY KEY,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(50),
            message VARCHAR(50)
        );`)

     } catch (err) {
        console.error(err);
     }
    
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utiliser Pug comme moteur de modèle
app.set('view engine', 'pug');
app.set('views', './views'); // Définir le répertoire des fichiers Pug

// Route pour afficher le formulaire
app.get('/formulaire', (req, res) => {
  res.render('formulaire');
});

app.get('/', (_req, res) => {
    res.render('home.pug')
})

// Route pour traiter le formulaire soumis
app.post('/traitement-formulaire', async (req, res) => {
  const client = await pool.connect()
  const { nom, prenom, email, message } = req.body;
  await client.query(`
    INSERT INTO contact (first_name, last_name, email, message)
    VALUES ($1::text, $2::text, $3::text, $4::text);
  `, [nom, prenom, email, message])
  // Vous pouvez traiter les données du formulaire ici
  res.send(`Données reçues : Nom=${nom}, Prénom=${prenom}, Email=${email}, Message=${message}`);
});

app.get('/contacts', async (req, res) => {
    const client = await pool.connect()
    const {rows} = await client.query(`SELECT * FROM public.contact`)
    console.log(rows)
    res.send(JSON.stringify(rows, null, 2));    
})

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
