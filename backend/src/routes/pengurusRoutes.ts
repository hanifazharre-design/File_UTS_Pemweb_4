import { Router } from 'express';
import {
  getPengurus,
  createPengurus,
  updatePengurus,
  deletePengurus,
} from '../controllers/pengurusController';

const router = Router();

router.get('/', getPengurus);
router.post('/', createPengurus);
router.put('/:id', updatePengurus);
router.delete('/:id', deletePengurus);

export default router;
