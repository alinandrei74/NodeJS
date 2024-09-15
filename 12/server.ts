import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Tipos
type Planet = {
  id: number,
  name: string,
};

type Planets = Planet[];

// Base de datos simulada
let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de planetas');
});

app.get('/planets', (req, res) => {
  res.json(planets);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});