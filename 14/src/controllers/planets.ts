import { Request, Response } from 'express';

type Planet = {
  id: number,
  name: string,
};

let planets: Planet[] = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

export const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Planet not found" });
  res.status(200).json(planet);
};

export const create = (req: Request, res: Response) => {
//  const newPlanet: Planet = {
//    id: planets.length + 1,
//    name: req.body.name,
// };
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "Planet created successfully" });
};

export const updateById = (req: Request, res: Response) => {
  planets = planets.map(p => 
    p.id === parseInt(req.params.id) ? { ...p, name: req.body.name } : p
  );
  res.status(200).json({ msg: "Planet updated successfully" });
};

export const deleteById = (req: Request, res: Response) => {
  planets = planets.filter(p => p.id !== parseInt(req.params.id));
  res.status(200).json({ msg: "Planet deleted successfully" });
};