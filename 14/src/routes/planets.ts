import express from 'express';
import { getAll, getOneById, create, updateById, deleteById } from '../controllers/planets';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOneById);
router.post('/', create);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

export default router;