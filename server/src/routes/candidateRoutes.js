import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  getCandidates,
  getCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate
} from '../controllers/candidateController.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getCandidates);
router.get('/:id', getCandidate);
router.post('/', createCandidate);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

export default router;