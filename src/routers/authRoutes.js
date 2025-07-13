
import express from 'express'
import { getRegisteredController } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', getRegisteredController);
// router.post('/login');
// router.post('/logout');
// router.post('/refersh-tocken')

export default router;  