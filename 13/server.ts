import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';
import Joi from 'joi';

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

// Validación con Joi
const planetSchema = Joi.object({
  name: Joi.string().required(),
});

// Router
const router = express.Router();

// GET /api/planets
router.get('/', (req, res) => {
  res.status(200).json(planets);
});

// GET /api/planets/:id
router.get('/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Planet not found" });
  res.status(200).json(planet);
});

// POST /api/planets
router.post('/', (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newPlanet: Planet = {
    id: planets.length + 1,
    name: req.body.name,
  };
  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
});

// PUT /api/planets/:id
router.put('/:id', (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Planet not found" });

  planet.name = req.body.name;
  res.status(200).json({ msg: "Planet updated successfully" });
});

// DELETE /api/planets/:id
router.delete('/:id', (req, res) => {
  const index = planets.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ msg: "Planet not found" });

  planets.splice(index, 1);
  res.status(200).json({ msg: "Planet deleted successfully" });
});

// Usar el router
app.use('/api/planets', router);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});