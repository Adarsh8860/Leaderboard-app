import express from 'express';
import {
  getUsers,
  addUser,
  claimPoints,
  getClaimHistory
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/add', addUser);
router.post('/claim', claimPoints);
router.get('/history', getClaimHistory);

export default router;
