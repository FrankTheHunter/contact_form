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
            phone_number VARCHAR(50)
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
  const { nom, prenom, email, telephone } = req.body;
  await client.query(`
    INSERT INTO contact (first_name, last_name, email, phone_number)
    VALUES ('John', 'Doe', 'john.doe@example.com', '123-456-7890');
  `)
  // Vous pouvez traiter les données du formulaire ici
  res.send(`Données reçues : Nom=${nom}, Prénom=${prenom}, Email=${email}, Téléphone=${telephone}`);
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
