import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = parseInt(process.env.NODE_PORT || '') || 3000;

const pool = new Pool({
  database: process.env.POSTGRES_DB || 'contact_form',
  password: 'password',
  user: 'root',
  host: process.env.POSTGRES_HOST || 'localhost',
});

(async () => {
  const client = await pool.connect();

  try {
    const res = await client.query(`
      CREATE TABLE IF NOT EXISTS contact (
        contact_id serial PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(50),
        message VARCHAR(50)
      );
    `);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/formulaire', (req, res) => {
  res.render('formulaire');
});

app.get('/', (_req, res) => {
  res.render('home.pug');
});

app.post('/traitement-formulaire', async (req, res) => {
  const client = await pool.connect();
  const { nom, prenom, email, message } = req.body;

  try {
    if (!nom || !prenom || !email || !message) {
      throw new Error('Please complete all fields on the form.');
    }

    // Check for special characters in the form fields
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharsRegex.test(nom) || specialCharsRegex.test(prenom) || specialCharsRegex.test(message)) {
      throw new Error('Please avoid using special characters in the name and message fields.');
    }

    // Add more validation for email if needed

    await client.query(`
      INSERT INTO contact (first_name, last_name, email, message)
      VALUES ($1::text, $2::text, $3::text, $4::text);
    `, [nom, prenom, email, message]);

    // Redirect to the success page on successful form submission
    res.redirect('/success');
  } catch (err) {
    console.error(err);

    // Send a user-friendly error message to the client
    res.status(500).send('An error occurred while processing the form.');
  } finally {
    client.release();
  }
});

app.get('/success', (req, res) => {
  res.render('success');
});

app.get('/contacts', async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM public.contact`);
    console.log(rows);
    res.send(JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while retrieving contacts.');
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
