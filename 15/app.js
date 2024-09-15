const express = require('express');
const pgp = require('pg-promise')();

const app = express();
const port = 3000;

// Conexión a la base de datos
const db = pgp('postgres://username:password@localhost:5432/your_database_name');

// Middleware para parsear JSON
app.use(express.json());

// Función para configurar la base de datos
async function setupDb() {
  await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets(
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL
    );

    INSERT INTO planets (name) VALUES ('Earth'), ('Mars');
  `);
  console.log('Database setup complete');
}

// Rutas para planetas
app.get('/planets', async (req, res) => {
  try {
    const planets = await db.any('SELECT * FROM planets');
    res.json(planets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/planets/:id', async (req, res) => {
  try {
    const planet = await db.one('SELECT * FROM planets WHERE id=$1', req.params.id);
    res.json(planet);
  } catch (error) {
    res.status(404).json({ error: 'Planet not found' });
  }
});

app.post('/planets', async (req, res) => {
  try {
    const { name } = req.body;
    const newPlanet = await db.one('INSERT INTO planets (name) VALUES ($1) RETURNING *', name);
    res.status(201).json(newPlanet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/planets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedPlanet = await db.one('UPDATE planets SET name=$2 WHERE id=$1 RETURNING *', [id, name]);
    res.json(updatedPlanet);
  } catch (error) {
    res.status(404).json({ error: 'Planet not found' });
  }
});

app.delete('/planets/:id', async (req, res) => {
  try {
    await db.none('DELETE FROM planets WHERE id=$1', req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Planet not found' });
  }
});

// Iniciar el servidor
setupDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});